const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    _id: { 
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: new Date()
    }
});

module.exports = mongoose.model('user', userSchema);