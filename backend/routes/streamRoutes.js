const express = require('express');
const router = express.Router();
const Stream = require('../models/Stream');

// Initialize streams array
let streams = [
    { id: 1, title: 'Stream 1', description: 'Description for Stream 1' },
    { id: 2, title: 'Stream 2', description: 'Description for Stream 2' },
    { id: 3, title: 'Stream 3', description: 'Description for Stream 3' }
];

router.get('/', async (req, res) => {
    try {
        const streams = await Stream.find();
        res.json(streams);
    } catch (error) {
        console.error('Error fetching streams:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route for creating a new stream
router.post('/create', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newStream = new Stream({ title, description });
        const savedStream = await newStream.save();
        res.status(201).json(savedStream);
    } catch (error) {
        console.error('Error creating stream:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
