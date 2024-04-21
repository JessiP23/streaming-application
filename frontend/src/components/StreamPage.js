import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StreamPage({ match }) {
    const [stream, setStream] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStream = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/streams/${match.params.id}`);
                setStream(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stream:', error);
                setLoading(false);
            }
        };

        fetchStream();
    }, [match.params.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!stream) {
        return <div>Stream not found</div>;
    }

    return (
        <div>
            <h2>{stream.title}</h2>
            <p>{stream.description}</p>
            {/* Add any additional details you want to display */}
        </div>
    );
}

export default StreamPage;
