const mongoose = require("mongoose")

const MusicSchema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    artista: {
        type: String,
        required: true
    },
    compositor: [String],
    titulo: {
        type: String,
        required: true,
        unique: true
    },
    // categoria: [String],
    // anoDeLancamento: Date,
    // clipe: Boolean,
    // imagens: [String],
    // curtidas: Number
}, { timestamps  : true })

const Model = mongoose.model("musica", MusicSchema)
module.exports = Model