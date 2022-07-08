const mongoose =  require("mongoose")

const movieSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    Title: {
        type: String,
        require: true
    },
    Year: {
        type: Date,
        require: true
    },
    Genre: {
        type: [String],
        require: true
    },
    Runtime: String,
    Director: [String],
    Actors: [String],
    Plot: String

})

module.exports = mongoose.model("movies", movieSchema)