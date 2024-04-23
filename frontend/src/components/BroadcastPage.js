import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BroadcastPage() {
    const { streamId } = useParams();
    const [stream, setStream ] = useState(null);
    useEffect(() => {
        const fetchStream = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/streams/${streamId}`);
                setStream(response.data);
            } catch (error) {
                console.error('Error fetching stream:', error);
            }
        };

        fetchStream();
    }, [streamId]);

    return (
        <div>
            <h2>Broadcast Page</h2>
            {stream ? (
                <>
                    <h3>{stream.title}</h3>
                    {stream.type === 'camera' ? (
                        <video src={stream.cameraFeed} autoPlay />
                    ) : (
                        <img src={stream.screenShare} alt="Screen Share" />
                    )}
                </>
            ) : (
                <p>Loading stream...</p>
            )}
        </div>
    );
}

export default BroadcastPage;
