const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv-safe').config();

const db = require('./database/mongoConfig');
const filmesRoutes = require('./routes/filmesRouters');

db.connect();

app.use(cors());
app.use(express.json());
app.use("/filmes", filmesRoutes);

module.exports = app;