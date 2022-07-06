const mongoose = require("mongoose");

const articleScema = new mongoose.Schema({
    title: String,
    description: String,
    author: {
        name: String,
        icon: {
            type: String,
            required: false
        },
    },
    date: {
        type: Date,
        default: Date.now
    },
    thumbnail: {
        type: String,
        required: false
    }
});

module.exports = Article = mongoose.model('article', articleScema)