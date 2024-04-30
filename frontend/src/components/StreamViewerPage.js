import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { User, StreamVideoClient, StreamVideo, StreamCall, LivestreamLayout } from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWW9kYSIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvWW9kYSIsImlhdCI6MTcxNDE0NzM4NywiZXhwIjoxNzE0NzUyMTkyfQ._JuohJsOGs7mek2zghSsDEKqj4bVTC_QDhNoplEVk6M';
const userId = 'Yoda';
const callId = 'YC5hO2GH7hQN';

const user = {
    id: userId,
    name: 'Oliver-Viewer',
    image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver-Viewer',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('livestream', callId);

call.microphone.disable();

call.join();

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
            setCameraOn(response.data.cameraOn);
        } catch (error) {
            console.error('Error fetching stream data:', error);
        }
    };

    useEffect(() => {
        if (cameraOn) {
            call.camera.enable();
        } else {
            call.camera.disable();
        }
    }, [cameraOn]);



    if (!streamData) {
        return <div>Loading...</div>;
    }

    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <LivestreamLayout
                    showParticipationCount={true}
                    showDuration={true}
                    showLiveBadge={true}
                />
            </StreamCall>
        </StreamVideo>
    );
}

export default StreamViewerPage;
