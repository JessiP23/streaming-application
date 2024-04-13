import React, { useState } from "react";
import axios from "axios";

function StreamInitiationModal({onClose}){
    const [streamDetails, setStreamDetails] = useState({ title: '', description: '', category: ''});

    const handleChange = e => {
        setStreamDetails({ ...streamDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        axios.post('http://localhost:5000/api/start-stream', streamDetails)
            .then(response => {
                console.log('Stream initiated successfully');
                onClose();
            })
            .catch(error => {
                console.error('Error initiating stream:', error);
            });
    };

    return (
        <div>
            <h2>Initiate Stream</h2>
            <input type="text" name="title" value={streamDetails.title} onChange={handleChange} placeholder="Title" />
            <input type="text" name="description" value={streamDetails.description} onChange={handleChange} placeholder="Description" />
            <input type="text" name="category" value={streamDetails.category} onChange={handleChange} placeholder="Category" />
            <button onClick={handleSubmit}>Start Stream</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default StreamInitiationModal;