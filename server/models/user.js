const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false
    },
    linkedWebsite: {
        type: String,
        default: "",
        required: false,
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    writtenDocuments: {
        type: [String],
    },
    starredDocuments: {
        type: [String],
    },
    votedDocuments: {
        type: [String],
    },
    settings: {
        showStarredDocuments: {
            type: Boolean,
            default: true
        },
        showVotedDocuments: {
            type: Boolean,
            default: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = User = mongoose.model('user', userSchema)