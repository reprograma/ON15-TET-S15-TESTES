const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    classrooms: {
        type: String,
        required:true
    },
    email:{
     type: String,
     required:true

    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('teacher', teacherSchema);