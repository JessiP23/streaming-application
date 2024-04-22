const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/streaming_app';
const cors = require('cors');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const Stream = require('./models/Stream');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


app.post('/api/start-stream', async (req, res) => {
    const { title, description, category } = req.body;

    try {
        const newStream = new Stream({
            title, 
            description,
            category,
            owner: null,
            viewers: [],
            createdAt: new Date()
        });

        const savedStream = await newStream.save();
        res.status(201).json(savedStream);
    } catch (error) {
        console.error('Error creating stream:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/generate-secret-code', (req, res) => {
    const { streamerId } = req.body;
    if (!streamers[streamerId]){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const secretCode = generateSecretCode();

    streamers[streamerId].secretCode = secretCode;

    res.json({ secretCode });
});

function generateSecretCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

//Generate unique code for transfer streaming
function generateTransferCode() {
    return Math.random().toString(36).substring(2,8).toUpperCase();
}

app.get('/api/streams', async (req, res) => {
    try {
        const streams = await Stream.find();
        res.json(streams);
    } catch (error) {
        console.error('Error fetching streams:', error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get('/streams/:id/transfer', async (req, res) => {
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

app.post('/streams/:id/transfer', (req, res) => {
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