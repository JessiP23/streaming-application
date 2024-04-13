import React, { useState } from "react";
import axios from "axios";
import WebSocketComponent from "./WebSocket";

function StreamDetails({stream}) {
    const [transferCode, setTransferCode] = useState('');
    const [claimSuccess, setClaimSuccess] = useState(false);
    
    const handleClaimStream = () => {
        axios.post(`http://localhost:5000/streams/${stream.id}/transfer/claim`, {transferCode})
            .then(response => {
                setClaimSuccess(true);
            })
            .catch(error => {
                console.error('Error claiming stream:', error);
            });
    };

    return (
        <div>
            <h2>Stream Details</h2>
            <p>Title: {stream.title}</p>
            <p>Description: {stream.description}</p>
            <p>Owner: {stream.owner}</p>
            {stream.transferCode ? (
                <div>
                    <p>Transfer Code: {stream.transferCode}</p>
                    <input type="text" value={transferCode} onChange={e => setTransferCode(e.target.value)} placeholder="Enter transfer code" />
                    <button onClick={handleClaimStream}>Claim Stream</button>
                    {claimSuccess && <p>Stream claimed successfully!</p>}
                </div>
            ) : (
                <p>No transfer code available</p>
            )}
            <WebSocketComponent />
        </div>
    );
}

export default StreamDetails;