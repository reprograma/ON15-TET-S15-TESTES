const express = require("express")
require("dotenv").config()
const cors = require("cors")
const db = require("./database/mongooseConnect")
const musicRoutes = require("./routes/musicRoutes")

const app = express()
// configuração
app.use(express.json())
app.use(cors())

// base de dados
db.connect()

// rotas - vem depois do banco
app.use(musicRoutes)

module.exports = app 