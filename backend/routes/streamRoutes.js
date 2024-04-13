const express = require('express');
const router = express.Router();

// Sample streams data
const streams = [
    { id: 1, title: 'Stream 1', description: 'Description for Stream 1' },
    { id: 2, title: 'Stream 2', description: 'Description for Stream 2' },
    { id: 3, title: 'Stream 3', description: 'Description for Stream 3' }
];

// Route for fetching streams
router.get('/', (req, res) => {
    res.json(streams);
});

module.exports = router;
