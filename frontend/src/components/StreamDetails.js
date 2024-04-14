import React, { useEffect, useState } from "react";
import axios from "axios";
import WebSocketComponent from "./WebSocket";

function StreamDetails({stream}) {
    const [streamData, setStreamData] = useState(null);
    const [transferCode, setTransferCode] = useState('');
    const [claimSuccess, setClaimSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (stream) {
            axios.get(`http://localhost:5000/streams/${stream.id}`)
                .then(response => {
                    setStreamData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching stream details:', error);
                    setLoading(false);
                });
        }
    }, [stream]);

    const handleClaimStream = () => {
        axios.post(`http://localhost:5000/streams/${stream.id}/transfer/claim`, {transferCode})
            .then(response => {
                setClaimSuccess(true);
            })
            .catch(error => {
                console.error('Error claiming stream:', error);
            });
    };

    if (loading){
        return <div>Loading...</div>
    }

    if (!streamData) {
        return <div>Stream Details not found</div>;
    }

    return (
        <div>
            <h2>Stream Details</h2>
            <p>Title: {stream.title}</p>
            <p>Description: {stream.description}</p>
            <p>Owner: {stream.owner}</p>
            {streamData.transferCode ? (
                <div>
                    <p>Transfer Code: {streamData.transferCode}</p>
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