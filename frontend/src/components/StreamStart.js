import React, {useState, useRef} from 'react';
import { v4 as uuid } from 'uuid';

function StreamStart() {
    const [streaming, setStreaming] = useState(false);
    const [transferCode, setTransferCode] = useState('');
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);

    //Camera setup video and microphone
    const handleStartStream = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            setStreaming(true);
            videoRef.current.srcObject = mediaStream;
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
            {!streaming ? (
                <button onClick={handleStartStream}>Start Streaming</button>
            ) : (
                <div>
                    <video ref={videoRef} autoPlay />
                    <button onClick={handleStopStream}>Stop Streaming</button>
                </div>
            )}
        </div>
    );
}

export default StreamStart;
