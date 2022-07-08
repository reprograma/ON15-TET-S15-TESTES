const MovieSchema = require("../models/movieSchema")

const getAll = async (req, res) => {
    try {
        const allMovies = await MovieSchema.find()
        res.status(200).send(allMovies)

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const createMovie = async (req, res) => {
    try {
        // const newMovie = new MovieSchema({
        //     Title: req.body.Title,
        //     Year: req.body.Year,
        //     Genre: req.body.Genre,
        //     Runtime: req.body.Runtime,
        //     Director: req.body.Director,
        //     Actors: req.body.Actors,
        //     Plot: req.body.Plot
        // })
        const newMovie = new MovieSchema(req.body)
        const savedMovie = await newMovie.save()
        res.status(201).send({
            message: "Successfully registered movie.",
            savedMovie})

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const updateById = async (req,res) => {
    try {
        movieFound = await MovieSchema.findById(req.params.id)
        if (movieFound) {
            movieFound.Title = req.body.Title || movieFound.Title,
            movieFound.Year = req.body.Year || movieFound.Year,
            movieFound.Genre = req.body.Genre || movieFound.Genre,
            movieFound.Runtime = req.body.Runtime || movieFound.Runtime,
            movieFound.Director = req.body.Director || movieFound.Director,
            movieFound.Actors = req.body.Actors || movieFound.Actors,
            movieFound.Plot = req.body.Plot || movieFound.Plot
      }

        savedMovie = await movieFound.save()
        res.status(200).send({
            message: "Successfully updated movie.",
            savedMovie
      })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const deleteById = async (req,res) => {
    try {
        movieFound = await MovieSchema.findById(req.params.id)
        await movieFound.delete()

        return res.status(200).send({
            mensagem: "Successfully deleted movie",
            movieFound
          })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}
    


module.exports = {
    getAll,
    createMovie,
    updateById,
    deleteById
    
}