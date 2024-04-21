const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming a User model exists
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Assuming a User model exists
    createdAt: { type: Date, default: Date.now }
});

const Stream = mongoose.model('Stream', streamSchema);

module.exports = Stream;
