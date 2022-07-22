const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    title: String,
    document: { // The entire document, stored as HTML
        type: Object,
        required: true
    },
    description: { // If the document starts with a paragraph, then that will be the description, which is shown in article previews on the discovery page.
        type: String,
        required: false,
        default: ""
    },
    shortId: { // A 12-digit unique ID for the article, used in URLs.
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    authorId: {
        type: String,
        required: true
    }
});

module.exports = Document = mongoose.model('document', documentSchema)