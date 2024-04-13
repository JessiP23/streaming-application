import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StreamDetails from './StreamDetails';

function StreamList() {
    const [streams, setStreams] = useState([]);
    const [selectedStream, setSelectedStream] = useState(null);
    const [transferCode, setTransferCode] = useState('');
    const [transferSuccess, setTransferSuccess] = useState(false); // Using transferSuccess state

    useEffect(() => {
        axios.get('http://localhost:5000/streams')
            .then(response => {
                setStreams(response.data);
            })
            .catch(error => {
                console.error('Error fetching streams:', error);
            });
    }, []);

    const handleStreamSelect = stream => {
        setSelectedStream(stream);
    };

    const handleStreamTransfer = () => {
        axios.post('http://localhost:5000/streams/transfer', { streamId: selectedStream.id, code: transferCode })
            .then(response => {
                setTransferSuccess(true); // Setting transferSuccess to true upon successful transfer
            })
            .catch(error => {
                console.error('Error transferring stream:', error);
            });
    };

    return (
        <div>
            <h2>Stream List</h2>
            <ul>
                {streams.map(stream => (
                    <li key={stream.id} onClick={() => handleStreamSelect(stream)}>
                        {stream.title}
                    </li>
                ))}
            </ul>
            {selectedStream && <StreamDetails stream={selectedStream} />}
            {selectedStream && (
                <div>
                    <input type='text' value={transferCode} onChange={e => setTransferCode(e.target.value)} placeholder='Enter Transfer Code' />
                    <button onClick={handleStreamTransfer}>Transfer Stream</button>
                    {transferSuccess && <p>Stream transferred successfully!</p>} {/* Conditionally rendering based on transferSuccess */}
                </div>
            )}
        </div>
    )
}

export default StreamList;
