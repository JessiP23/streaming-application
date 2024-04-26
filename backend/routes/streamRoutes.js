const express = require('express');
const router = express.Router();
const Stream = require('../models/Stream');


router.get('/', async (req, res) => {
    try {
        const streams = await Stream.find();
        res.json(streams);
    } catch (error) {
        console.error('Error fetching streams:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const stream = await Stream.findById(id);
        if (!stream) {
            return res.status(404).json({ error: "Stream not found" });
        }
        res.json(stream);
    } catch (error) {
        console.error('Error fetching stream data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for creating a new stream
router.post('/create', async (req, res) => {
    const { title, description, streamUrl } = req.body;
    try {
        const newStream = new Stream({ title, description, streamUrl });
        const savedStream = await newStream.save();
        res.status(201).json(savedStream);
    } catch (error) {
        console.error('Error creating stream:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;