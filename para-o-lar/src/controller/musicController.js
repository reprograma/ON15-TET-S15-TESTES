const MusicModel = require("../models/musicModel")

const createMusic = async (request, response) => {
   const {
       artist, title, releaseYear, clipe, 
        composer, genre, images 
    } = request.body

    if (!artist) {
        return response
        .status(400)
        .json({ message: "O artista não pode ser vazio"})
    }

    try {
        const newMusic = new MusicModel({
            curtidas: 0,
            artista: artist,
            titulo: title,
            anoDeLancamento: releaseYear,
            clipe,
            compositor: composer,
            categoria: genre,
            imagens: images
            
        })
        const savedMusic = await newMusic.save()
        response.status(201).json({savedMusic})
    } catch (error) {
        response.status(500).json({ message: error.message})
    }
}

const findAllMusic = async (request, response) => {
    try {
        const allMusic = await MusicModel.find()
            response.status(200).json(allMusic)
        
    } catch (error) {
        response.status(500).json({ message: error.message})
    }
}

const findById = async (request, response) => {
    try {
        const findMusic = await MusicModel.findById(request.params.id)
        response.status(200).json(findMusic)
    } catch (error) {
        response.status(500).json({ message: error.message})
    }
}

module.exports = {
    createMusic,
    findAllMusic,
    findById
}