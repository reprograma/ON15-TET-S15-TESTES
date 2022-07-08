const express = require("express")
const app = express()
const cors = require("cors")

require("dotenv-safe").config()

const db = require("./config/database")
const movieRoutes = require ("./routes/movieRoutes")

db.connect()

app.use(cors())
app.use(express.json())
app.use("/movies", movieRoutes)

module.exports = app