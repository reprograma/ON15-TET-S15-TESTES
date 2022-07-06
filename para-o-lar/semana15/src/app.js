const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv-safe').config();

const db = require('./Config/dataBase');
const teacherRoutes = require('./Routes/teacherRoutes');

db.connect();

app.use(cors());
app.use(express.json());
app.use("/teacher", teacherRoutes);

module.exports = app;