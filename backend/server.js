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
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
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
        const transferCode = generateTransferCode();
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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port 5000`);
});



/*
yarn create vite livestream-broadcaster --template react-ts
cd livestream-broadcaster
yarn add @stream-io/video-react-sdk

video & audio

yarn dev


App.tsx

import './App.css';
import {
    User,
    StreamVideoClient,
    StreamVideo,
    StreamCall,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

const apiKey = 'mmhfdzb5evj2'
const token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWW9kYSIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvWW9kYSIsImlhdCI6MTcxNDE0NzM4NywiZXhwIjoxNzE0NzUyMTkyfQ._JuohJsOGs7mek2zghSsDEKqj4bVTC_QDhNoplEVk6M'
const userId = 'Yoda';
cosnt callId = 'YC5hO2GH7hQN';

const user: User = {
    id: userId,
    name: 'Jessi',
    image: 'https://getstream.io/random_svg/?id=stefan&name=Stefan',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('livestream', callId);
call.join({ create: true });

function App() {
    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <MyLivestreamUI />
            </StreamCall>
        </StreamVideo>
    );
}
export default App;\

export const MyLiveStreamI = () => {
    const call = useCall();
    const { useIsCallLive, useLocalParticipant, useParticipantCount, useCallEgress, } = useCallStateHooks();
    const totalParticipats = useParticipantCount();
    const localParticipant = useLocalParticipant();
    const isCallLive = useIsCallLive();
    const egress = useCallEgress();

    ueseEffect(() => {
        console.log('HSL playlist URL:', egress?.hls?.playlist_url);
    }, [egress?.hls?.playlist_url]);

    return(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div
                style={{
                    alignSelf: 'flex-start',
                    color: 'white',
                    backgroundColor: 'blue',
                    borderRadius: '8px',
                    padding: '4px 6px',
                }}
            >
                Live: {totalParticipants}
            </div>
            <div style={{ flex: 1 }}>
                {localParticipant && (
                    <PartipantView
                        participant = {localParticipant}
                        ParticipantViewUI = {null}
                    />
                )}
            </div>
            <div style = {{ alignSelf: 'center' }}>
                {isCallLive ? (
                    <button onClick={() => call?.stopLive()}>Stop Livestream</button>
                ) : (
                    <button onClick = {() => call?.goLive({start_hls: true})}>Start LiveStream</button>
                )}
            </div>
        </div>
    )
};


    WE NEED AN API KEY
    USER TOKEN
    USER ID
    CALL ID

    To get those we go to REact LiveStream Tutorial

    SFU Cascading
    Routes each stream to SFU and optimize the streams, reduce latency


after all this stteps:

yarn create vite livestream-viewer --template react-ts
cd livestream-viewer
yarn add @stream-io/video-react-sdk
yarn dev


import './App.css';

import {
    LivestreamLayout,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

const apiKey = 'mmhfdzb5evj2'
const token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWW9kYSIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvWW9kYSIsImlhdCI6MTcxNDE0NzM4NywiZXhwIjoxNzE0NzUyMTkyfQ._JuohJsOGs7mek2zghSsDEKqj4bVTC_QDhNoplEVk6M'
const userId = 'Yoda';
cosnt callId = 'YC5hO2GH7hQN';

const user: User = {
    id: userId,
    name: 'Oliver-Viewer',
    image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver-Viewer',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('livestream', callId);

call.camera.disable();
call.microphone.disable();

call.join();

export const App = () => {
    return (
        <StreamVideo client = {client}>
            <StreamCall call={call}>
                <LiveStreamLayout
                    showParticipantCount={true}
                    showDuration={true}
                    showLiveBadge={true}
                />
            </StreamCall>
        </StremVideo>
    )
}

yarn dev

*/