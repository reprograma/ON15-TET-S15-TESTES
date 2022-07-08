const ArtistSchema = require('../models/artistSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const getAll = async(req, res) => {
    const authHeader = req.get('authorization')
    const token = authHeader.split(' ')[1];
    console.log("Token: ", token)

    if (!token) {
        return res.status(401).send("Erro no header")
    }

    ArtistSchema.find(function(err, artists) {
        if (err) {
            res.status(500).send({ message: err.message })
        }
        res.status(200).send(artists)
    })
}

const createArtist = async(request, response) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    try {

        const newArtist = new ArtistSchema(req.body);
        const savedArtist = await newArtist.save();
        res.status(201).send({
            "message": "Artista cadastrado com sucesso!",
            savedArtist
        });
    } catch (err) {
        console.error(err)
    };
}
const updateArtistById = async(req, res) => {
    try {
        const findArtist = await ArtistSchema.findById(req.params.id)

        if (findArtist) {
            findArtist.name = req.body.name || findArtist.name

        }

        const savedArtist = await findArtist.save()

        return res.status(200).send({
            message: "Usuário atualizada com sucesso!",
            savedArtist
        })

    } catch (error) {
        console.error(error)
    };
};

const deleteArtistById = async(req, res) => {
    try {
        const artistFound = await ArtistSchema.findById(req.params.id)

        await artistFound.delete()

        return res.status(200).send({
            "mensagem": `Usuário '${artistFound.name}' deletada com sucesso!`,
            artistFound
        })

    } catch (err) {
        return res.status(400).send({
            "mensagem": err.message
        });
    };
};

module.exports = {
    getAll,
    createArtist,
    updateArtistById,
    deleteArtistById
};