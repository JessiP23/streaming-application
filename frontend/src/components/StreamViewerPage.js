import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

function StreamViewerPage() {
    const { streamId } = useParams();
    const [streamData, setStreamData] = useState(null);

    useEffect(() => {
        fetchStreamData(streamId);
    }, [streamId]);

    const fetchStreamData = async (streamId) => {
        try {
            const response = await axios.get(`http://localhost:5000/streams/${streamId}`);
            setStreamData(response.data);
        } catch (error) {
            console.error('Error fetching stream data:', error);
        }
    };

    console.log('Stream Data:', streamData);

    if (!streamData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Stream Viewer</h2>
            <h3>{streamData.title}</h3>
            <p>{streamData.description}</p>
            {streamData.streamUrl ? (
                <video src={streamData.streamUrl} controls autoPlay />
            ) : (
                <div>No video available for this stream </div>
            )}
        </div>
    );
}

export default StreamViewerPage;


