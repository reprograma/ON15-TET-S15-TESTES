const FilmeSchema = require("../models/filmesSchema")
const bcrypt = require('bcrypt');

const getAll = async (request, response) => {
    FilmeSchema.find(function (erro, filmes) {
        if (erro) {
            return response.status(500).send({
                message: erro.message
            })
        }
        return response.status(200).json(filmes)
    })
}

const buscarPorId = async (request, response) => {
    try {
        const buscarFilme = await FilmeSchema.findById(request.params.id)

        if (!buscarFilme) {
            response.status(404).send({
                "message": "Filme não encontrado",
                "statusCode": 404
            })
        }

        response.status(200).send({
            "message": "Filme encontrado com sucesso!",
            buscarFilme
        })

    } catch (erro) {
        console.error(erro)
    }
}

const cadastrarFilme = async (request, response) => {
    const hashedPassword = bcrypt.hashSync(request.body.password, 10)
    request.body.password = hashedPassword


    try {
        const novoFilme = new FilmeSchema(request.body)
        console.log("NOVO FILME: ", novoFilme)

        const salvarFilme = await novoFilme.save()


        return response.status(201).send({
            "message": "Filme cadastrado com sucesso!",
            salvarFilme
        })


    } catch (erro) {
        console.error(erro)
    }
}

const atualizarFilme = async (request, response) => {
    try {
        const buscarFilme = await FilmeSchema.findById(request.params.id)

        if (!buscarFilme) {
            response.status(404).send({
                "message": "Filme não encontrado",
                "statusCode": 404
            })
        }

        buscarFilme.titulo = request.body.titulo || buscarFilme.titulo
        buscarFilme.genero = request.body.genero || buscarFilme.genero
        buscarFilme.tempoExecucao = request.body.tempoExecucao || buscarFilme.tempoExecucao
        buscarFilme.anoLancamento = request.body.anoLancamento || buscarFilme.anoLancamento
        buscarFilme.escritor = request.body.escritor || buscarFilme.escritor
        buscarFilme.atores = request.body.atores || buscarFilme.atores
        buscarFilme.idioma = request.body.idioma || buscarFilme.idioma
        buscarFilme.pais = request.body.pais || buscarFilme.pais
        buscarFilme.premios = request.body.pais || buscarFilme.premios
        buscarFilme.imagem = request.body.imagem || buscarFilme.imagem

        const salvarFilme = await buscarFilme.save()
        console.log("Filme atualizado com sucesso!")

        response.status(200).send({
            "message": "Filme atualizado com sucesso!",
            salvarFilme
        })

    } catch (erro) {
        console.error(erro)
    }
}

const deletarFilme = async (request, response) => {
    try {
        const buscarFilme = await FilmeSchema.findById(request.params.id)

        await buscarFilme.delete()

        response.status(200).send({
            "message": "Filme deletado!"
        })

    } catch (erro) {
        console.error(erro)
    }
}
module.exports = {
    getAll,
    buscarPorId,
    cadastrarFilme,
    atualizarFilme,
    deletarFilme,
}