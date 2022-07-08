const MusicSchema = require('../model/musicModel')

const getAllMusic = async (request, response) => {
    try {
        const allMusic = await MusicSchema.find()
        response.status(200).json({
            "message": "Veja todas as músicas das banda The Mask of Tyrant:",
            allMusic})
    } catch (error) {
        response.status(500).json({ message: error.message }) 
    }
}

const createMusic = async (request, response) =>{

    try {

        const newMusic = new MusicSchema ({
            // _id: new mongoose.Schema.Types.ObjectId, // não precisa colocar i id pois o proprio mongo coloca um id automaticamente
            artist: request.body.artist,
            title: request.body.title,
            composer: request.body.composer,
            category: request.body.category,
            recordCompany: request.body.recordCompany,
            letter: request.body.letter,
            clip: request.body.clip,
            images: request.body.images,
            likes: 0,
            releaseYear: request.body.releaseYear,
            createdAt: new Date()

        })
        const saveMusic = await newMusic.save()
        response.status(201).json({
            "message": "Música cadastrada com sucesso:",
            saveMusic})
        
    } catch (error) {
        response.status(500).json({ message: error.message })   
    }
}

const updateMusic = async (request, response) => {
    try {

        const findMusic = await MusicSchema.findById(request.params.id) 

        if(!findMusic){
            response.status(404).json({
                "mensagem": "id não encontrado"
            })
        }

        findMusic.artist = request.body.artist || findMusic.artist
        findMusic.title = request.body.title || findMusic.title
        findMusic.composer = request.body.composer || findMusic.composer
        findMusic.category = request.body.category || findMusic.category
        findMusic.recordCompany= request.body.recordCompany || findMusic.recordCompany
        findMusic.letter = request.body.letter || findMusic.letter
        findMusic.clip = request.body.clip || findMusic.clip
        findMusic.images = request.body.images || findMusic.images
        findMusic.releaseYear = request.body.releaseYear || findMusic.releaseYear
       
        const saveMusic = await findMusic.save()
        
        response.status(200).json({
            "message": "Atualização realizada com sucesso:",
            saveMusic})

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const deleteMusic = async (request, response) => {
    try {
        const findMusic = await MusicSchema.findByIdAndDelete(request.params.id) 

    
        response.status(200).json({
            "message": "Música deletada com sucesso:",
           findMusic})
        
    } catch (error) {
        response.status(500).json({ message: error.message })
        
    }
}

module.exports = {
    getAllMusic,
    createMusic,
    updateMusic,
    deleteMusic
}