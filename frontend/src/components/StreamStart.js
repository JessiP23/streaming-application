import React, { useState, useRef, useEffect } from 'react';

function StreamStart() {
    const [streaming, setStreaming] = useState(false);
    const [stream, setStream] = useState(null);
    const [sharingScreen, setSharingScreen] = useState(false);
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
                        <video ref={videoRef} autoPlay muted />
                        <button onClick={handleStopStream}>Stop Streaming</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StreamStart;
