const mongoose = require('mongoose')

const MusicSchema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    artist: {
        type: String,
        required: true
    },
    
    title: {
        type: String,
        required: true,
        unique: true
    },

    composer:{
        type: [String],
        required: true
    },
    
    category: {
        type: [String],
        required: true
    },

    recordCompany:{
        type: String,
        required: true
    },

    letter:{
        type: String,
        required: true
    },

    clip: Boolean,

    images:{
        type: [String],
        required: true
    },

    likes: Number,

    releaseYear : String,

}, { timestamps : true })

const Model = mongoose.model('music', MusicSchema)
module.exports = Model

// module.exports = mongoose.model('music', MusicSchema)
