const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    title: String,
    document: {
        type: Object,
        required: true
    },
    shortId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Document = mongoose.model('document', documentSchema)