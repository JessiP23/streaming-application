import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StreamList() {
    const [streams, setStreams] = useState([]);

    useEffect(() => {
        fetchStreams();
    }, []);

    const fetchStreams = async () => {
        try {
            const response = await axios.get('http://localhost:5000/streams');
            setStreams(response.data);
        } catch (error) {
            console.error('Error fetching streams:', error);
        }
    };

    return (
        <div>
            <h2>Stream List</h2>
            <ul>
                {streams.map(stream => (
                    <li key={stream._id}> {/* Assuming _id is unique */}
                        <Link to={`/streams/${stream._id}`}>
                            <h3>{stream.title}</h3>
                        </Link>
                        <p>{stream.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StreamList;
