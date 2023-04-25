const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.ObjectId, //must use .equals() since this in a object and == will only compare references
        required: true,
        ref: 'User'
    },
    tags: {
        type: Array,
        required: false
    },
    published: {
        type: Boolean,
        required: true
    },
    publishDate: {
        type: Date,
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model("Post", PostSchema);