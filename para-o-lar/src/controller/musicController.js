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
            likes: 0,
            artist: artist,
            title: title,
            releaseYear: releaseYear,
            // clip: true,
            composer: composer,
            genre: genre,
            images: images

        })
        console.log(newMusic)
        const savedMusic = await newMusic.save()
        response.status(201).json({savedMusic})
    } catch (error) {
        response.status(500).json({ message: error.message})
    }
};

const findAllMusic = async (request, response) => {
    try {
        const allMusic = await MusicModel.find()
            response.status(200).json(allMusic)

    } catch (error) {
        response.status(500).json({ message: error.message})
    }
};

const findById = async (request, response) => {
    try {
        const findMusic = await MusicModel.findById(request.params.id)
        response.status(200).json(findMusic)
    } catch (error) {
        response.status(500).json({ message: error.message})
    }
};

const updateById = async (req, res) => {
    try {
        const findMusic = await MusicModel.findById(req.params.id)

        if(findMusic) {
            findMusic.artista = req.body.artista || findMusic.artista
            findMusic.compositor = req.body.compositor || findMusic.compositor
            findMusic.titulo = req.body.titulo || findMusic.titulo
        }

        const savedMusic = await findMusic.save()

        return res.status(200).json({
            message: "Música atualizada com sucesso!",
            savedMusic
          })


    } catch (error) {
        console.error(error)
    }
};

const deleteById = async (req, res) => {
    try {
        const musicFound = await MusicModel.findById(req.params.id)

        await musicFound.delete()

        return res.status(200).json({
            message: `Música ${musicFound} deletada com sucesso!`
        })

    } catch (error) {
        return res.status(400).json({
            mensagem: err.message
          })
    }

};

module.exports = {
    createMusic,
    findAllMusic,
    findById,
    updateById,
    deleteById
} 