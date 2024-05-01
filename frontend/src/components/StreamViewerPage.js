import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { LivestreamLayout } from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

function StreamViewerPage() {
    const { streamId } = useParams();
    const [streamData, setStreamData] = useState(null);
    const [cameraOn, setCameraOn] = useState(false);

    useEffect(() => {
        fetchStreamData(streamId);
    }, [streamId]);

    const fetchStreamData = async (streamId) => {
        try {
            const response = await axios.get(`http://localhost:5000/streams/${streamId}`);
            const { cameraOn } = response.data;
            setStreamData(response.data);
            setCameraOn(cameraOn);
        } catch (error) {
            console.error('Error fetching stream data:', error);
        }
    };

    useEffect(() => {
        // Enable or disable camera based on cameraOn state
        if (cameraOn) {
            // Enable camera
            console.log('Camera enabled');
        } else {
            // Disable camera
            console.log('Camera disabled');
        }
    }, [cameraOn]);

    if (!streamData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {cameraOn ? (
                <div>
                    <h1>Stream Video</h1>
                    {/* Include your video player component here */}
                    <LivestreamLayout
                        showParticipationCount={true}
                        showDuration={true}
                        showLiveBadge={true}
                    />
                </div>
            ) : (
                <div>Stream Not Live</div>
            )}
        </div>
    );
}

export default StreamViewerPage;
