const express = require('express')
const app = express()


const cors = require('cors')
app.use(cors())

app.use(express.json())
require('dotenv-safe').config()

const db = require('./database/mongoConnect')
db.connect()

const musicRoutes = require('./routes/musicRoutes')
app.use("/music", musicRoutes)

module.exports = app