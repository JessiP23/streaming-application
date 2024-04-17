import React, {useState} from 'react';
import { v4 as uuid } from 'uuid';

function StreamStart() {
    const [streaming, setStreaming] = useState(false);
    const [transferCode, setTransferCode] = useState('');

    const handleStartStream = () => {
        const code = uuid();
        setTransferCode(code);
        setStreaming(true);
    };

    return (
        <div>
            <h2>Stream Start</h2>
            {!streaming ? (
                <button onClick={handleStartStream}>Start Streaming</button>
            ) : (
                <div>
                    <p>Stream Started!</p>
                    <p>Transfer Code: {transferCode}</p>
                    <p>Share this code if you desire to transfer the stream to anyone else.</p>
                </div>
            )}
        </div>
    );
}

export default StreamStart;
