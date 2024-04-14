import React, { useState } from "react";
import axios from "axios";
import {Navigate} from 'react-router-dom';

function StreamInitiationModal({onClose}){
    const [streamDetails, setStreamDetails] = useState({ 
        title: "",
        description: "",
        category: "",
    });

    const [generatedCode, setGeneratedCode] = useState("");
    const [streamId, setStreamId] = useState(null);

    const handleChange = e => {
        setStreamDetails({ ...streamDetails, [e.target.name]: e.target.value });
    };

    const generateCode = () => {
        const code = Math.random().toString(36).substring(7);
        setGeneratedCode(code);
    }

    const handleSubmit = () => {
        axios
            .post('http://localhost:5000/api/start-stream', streamDetails)
            .then(response => {
                console.log('Stream initiated successfully');
                setStreamId(response.data.streamId);
                return <Navigate to={`/stream-details/${response.data.streamId}`} replace />
            })
            .catch(error => {
                console.error('Error initiating stream:', error);
            });
    };

    return (
        <div>
            <h2>Initiate Stream</h2>
            <input 
                type="text" 
                name="title" 
                value={streamDetails.title} 
                onChange={handleChange} 
                placeholder="Title" 
            />
            <input 
                type="text" 
                name="description" 
                value={streamDetails.description} 
                onChange={handleChange} 
                placeholder="Description" 
            />
            <input 
                type="text" 
                name="category" 
                value={streamDetails.category} 
                onChange={handleChange} 
                placeholder="Category" 
            />
            <button onClick={generateCode}>Generate Code</button>
            {generatedCode && <p>Generated Code: {generatedCode}</p>}
            <button onClick={handleSubmit}>Start Stream</button>
            {streamId && <Navigate to={`/stream-details/${streamId}`} replace />}
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default StreamInitiationModal;