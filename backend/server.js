const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/streaming_app';
const cors = require('cors');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

const streams = [
    {id: 1, title: 'Stream 1', description: 'Description for Stream 1'},
    {id: 2, title: 'Stream 2', description: 'Description for Stream 2'},
    {id: 3, title: 'Stream 3', description: 'Description for Stream 3'},
];

//Generate unique code for transfer streaming
function generateTransferCode() {
    return Math.random().toString(36).substring(2,8).toUpperCase();
}

app.get('/streams/transfer', async (req, res) => {
    const { id } = req.params;
    const stream = streams.find(stream => stream.id == id);
    if(!stream) {
        return res.status(404).json({ error: 'Stream not found' });
    }
    if (stream.transferCode) {
        return res.status(400).json({ error: 'Stream already has a transfer code' });
    }
    const transferCode = generateTransferCode();
    stream.transferCode = transferCode;
    return res.json({ transferCode });
});

app.post('/streams/transfer', (req, res) => {
    const { id } = req.params;
    const {transferCode} = req.body;
    const stream = streams.find(stream => stream.id == id);
    if (!stream) {
        return res.status(404).json({ error: 'Stream not found' });
    }
    if (!stream.transferCode || stream.transferCode !== transferCode) {
        return res.status(400).json({ error: 'Invalid transfer code' });
    }

    stream.owner = 'NewOwner';
    stream.transferCode = null;

    io.emit('streamUpdate', {message: `Stream ${stream.id} transferred successfully`});
    return res.json({ message: 'Stream transferred successfully' });
})

io.on('connection', (socket) => {
    console.log('A client connected');
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

io.on('error', (err) => {
    console.error('Socket error:', err);
});

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connection to MongoDB:', err);
});

const streamRoutes = require('./routes/streamRoutes');
app.use('/streams', streamRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});