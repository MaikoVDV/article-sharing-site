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
        default: ["Hello", "hi"]
    },
    starredDocuments: {
        type: [String],
        default: ["Hello", "hi"]
    },
    votedDocuments: {
        type: [String],
        default: ["Hello", "hi"]
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
    }
});
module.exports = User = mongoose.model('user', userSchema)