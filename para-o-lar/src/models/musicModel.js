const mongoose = require("mongoose")

const MusicSchema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    artist: {
        type: String,
        required: true
    },
    composer: [String],
    title: {
        type: String,
        required: true,
        unique: true
    },
    genre: [String],
    realeaseYear: Date,
    // clip: Boolean,
    images: [String],
    likes: Number
}, { timestamps  : true })

const Model = mongoose.model("music", MusicSchema)
module.exports = Model