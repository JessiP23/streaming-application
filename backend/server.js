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
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.post('/api/start-stream', async (req, res) => {
    const { title, description, category } = req.body;

    try {
        const streamId = uuidv4();
        const streamUrl = `http://localhost:5000/streams/${streamId}/stream`;
        const newStream = new Stream({
            streamId,
            title, 
            description,
            category,
            streamUrl,
            owner: null,
            viewers: [],
            createdAt: new Date(),
        });

        const savedStream = await newStream.save();
        io.emit('newStream', savedStream);
        res.status(201).json({ streamId });
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

app.get('/streams/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const stream = await Stream.findById(id);
        if (!stream) {
            return res.status(404).json({ error: "Stream not found" });
        }
        res.json(stream);
    } catch (error) {
        console.error('Error fetching stream data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/streams/:id/transfer', async (req, res) => {
    const { id } = req.params;
    try {
        const stream = await Stream.findById(id);
        if(!stream) {
            return res.status(404).json({ error: "Stream not found" });
        }
        if (stream.transferCode){
            return res.status(400).json({ error: "Stream already has a transfer code" });
        }
        const trasnferCode = generateTransferCode();
        stream.transferCode = transferCode;
        await stream.save();
        return res.json({ transferCode });
    } catch (error) {
        console.error('Error generating transfer code:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/streams/:id/transfer', async (req, res) => {
    const { id } = req.params;
    const { transferCode } = req.body;
    try {
        const stream = await Stream.findById(id);
        if (!stream) {
            return res.status(404).json({ error: 'Stream not found' });
        }
        if (!stream.transferCode || stream.transferCode !== transferCode) {
            return res.status(400).json({ error: 'Invalid transfer code' });
        }
        stream.owner = 'NewOwner';
        stream.transferCode = null;
        await stream.save();
        io.emit('streamUpdate', { message: `Stream ${stream.id} transferred successfully` });
        return res.json({ message: 'Stream transferred successfully' });
    } catch (error) {
        console.error('Error transferring stream:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

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

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});



/*
const express = require('express);
const fs = require('fs');

const app = express();

const videoFileMap = {
    'cdn': 'videos/cdn.np4',
    'generate-pass': 'videos/generate-pass.np4',
    'get-post': 'videos/get-post.np4',
}

app.get('/videos/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = videoFileMap[fileName]
    if (!filePath) {
        return res.status(404).send('File not found')
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10);
        const end = parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(filePath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(206, head)
        file.pipe(res);
    }
    else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res)
    }
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})


then is creates a videos folder where contains the videos to display




FRONTEND

VideoPlayer.jsx

import React, {useRef, useEffect} from 'react';

const videoPlayer = ({videoId}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current){

        }
    }, [])
    return (
        <video ref={videoRef} width='320' height='240' controls autoPlay>
            <source src={`https://localhost:3000/videos/${videoId}`} type="video/mp4"></source>
            Your browser does not support the video tag
        </video>
    )
}

export default videoPlayer;




App.js
import logo from './logo.svg'
import './App.css'
import {useState} from 'react';

function App() {
    const [videoId, setVideoId] = useState(null);
    
    function playVideo(e, videoId){
        e.preventDefault()
        setVideoId(videoId)
    }

    return (
        <div className="App">
            {videoId && <VideoPlayer videoId={videoId}></VideoPlayer>} <br />
            <button onClick={(e, 'cdn') => {}}>Play video 1</button>
            <button onClick={(e, 'generate-pass') => {}}>Play video 2</button>
            <button onClick={(e, 'get-post') => {}}>Play video 3</button>
        </div>
    )
}

*/