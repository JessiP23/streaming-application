import React, {useState, useRef} from 'react';
import { v4 as uuid } from 'uuid';
import './StreamStart.css';

function StreamStart() {
    const [streaming, setStreaming] = useState(false);
    const [transferCode, setTransferCode] = useState('');
    const [stream, setStream] = useState(null);
    const [sharingScreen, setSharingScreen] = useState(false);
    const videoRef = useRef(null);

    //Camera setup video and microphone
    const handleStartStream = async () => {
        try {
            let mediaStream;
            if (sharingScreen) {
                mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
            } else {
                mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            }
            setStream(mediaStream);
            setStreaming(true);
            videoRef.current && (videoRef.current.srcObject = mediaStream);
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
                        <button onClick={handleStartStream}>Start Streaming</button>
                        <label htmlFor='shareScreen'>Share Screen</label>
                        <input type='checkbox' id='shareScreen' checked={sharingScreen} onChange={() => setSharingScreen(!sharingScreen)} />
                    </>
                ) : (
                    <div className='video-container'>
                        <video ref={videoRef} autoPlay />
                        <button onClick={handleStopStream}>Stop Streaming</button>
                    </div>
                )}
            </div>
            {transferCode && (
                <div>
                    <p>Transfer Code: {transferCode}</p>
                    <p>Share this code if you desire to transfer the stream to anyone else.</p>
                </div>
            )}
        </div>
    );
}

export default StreamStart;
