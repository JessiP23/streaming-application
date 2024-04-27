import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { User, StreamVideoClient, StreamVideo, StreamCall } from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWW9kYSIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvWW9kYSIsImlhdCI6MTcxNDE0NzM4NywiZXhwIjoxNzE0NzUyMTkyfQ._JuohJsOGs7mek2zghSsDEKqj4bVTC_QDhNoplEVk6M';
const userId = 'Yoda';
const callId = 'YC5hO2GH7hQN';

const user = {
    id: userId,
    name: 'Stefan',
    image: 'https://getstream.io/random_svg/?id=stefan&name=Stefan',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('livestream', callId);
call.join({ create: true });

function StreamStart() {
    const [streaming, setStreaming] = useState(false);
    const [stream, setStream] = useState(null);
    const [sharingScreen, setSharingScreen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const handleStartStream = async () => {
        try {
            let mediaStream;
            if (sharingScreen) {
                mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
            } else {
                mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            }
            setStream(mediaStream);
            setStreaming(true);

            const streamData = {
                title: title,
                description: description,
                category: category,
                stream: mediaStream,
            };
            console.log(streamData);
            const response = await axios.post('http://localhost:5000/api/start-stream', streamData); 
            const streamId = response.data.streamId;
            console.log('Stream ID:', streamId);
        } catch (error) {
            console.error('Error accessing camera and microphone:', error);
        }
    };

    const handleStopStream = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setStreaming(false);
        }
    };

    return (
        <div>
            <h2>Stream Start</h2>
            <div>
                {!streaming ? (
                    <>
                        <label htmlFor='title'>Title:</label>
                        <input type='text' id='title' value={title}  onChange={(e) => setTitle(e.target.value)} />\
                        <label htmlFor='description'>Description:</label>
                        <input type='text' id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label htmlFor='category'>Category:</label>
                        <input type='text' id='category' value={category} onChange={(e) => setCategory(e.target.value)} />
                        <button onClick={handleStartStream}>Start Streaming</button>
                        <label htmlFor='shareScreen'>Share Screen</label>
                        <input type='checkbox' id='shareScreen' checked={sharingScreen} onChange={() => setSharingScreen(!sharingScreen)} />
                        <button onClick={handleStartStream}>Start Streaming</button>
                        <label htmlFor='shareScreen'>Share Screen</label>
                        <input type='checkbox' id='shareScreen' checked={sharingScreen} onChange={() => setSharingScreen(!sharingScreen)} />
                    </>
                ) : (
                    <div className='video-container'>
                        <video ref={videoRef} autoPlay muted />
                        <button onClick={handleStopStream}>Stop Streaming</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StreamStart;