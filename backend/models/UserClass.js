const mongoose = require('mongoose');

const UserClassSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

module.exports = mongoose.model("UserClass", UserClassSchema);