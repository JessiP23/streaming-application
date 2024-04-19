const express = require('express');
const router = express.Router();

// Initialize streams array
let streams = [
    { id: 1, title: 'Stream 1', description: 'Description for Stream 1' },
    { id: 2, title: 'Stream 2', description: 'Description for Stream 2' },
    { id: 3, title: 'Stream 3', description: 'Description for Stream 3' }
];

// Route for fetching streams
router.get('/', (req, res) => {
    res.json(streams);
});

// Route for creating a new stream
router.post('/create', (req, res) => {
    const { title, description } = req.body;
    const newStream = {
        id: streams.length + 1, // Generate unique ID for the new stream
        title,
        description
    };
    streams.push(newStream); // Add the new stream to the streams array
    res.status(201).json(newStream); // Return the newly created stream
});

module.exports = router;
