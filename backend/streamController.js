const Stream = require('../models/Stream');

const createStream = async (req, res) => {
    const { title, description, category } = req.body;
    const newStream = new Stream({ title, description, category, owner: req.user.id });
    await newStream.save();
    res.status(201).json(newStream);
};

module.exports = { createStream };