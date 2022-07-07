const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();
app.use(express.json());

const db = require('./config/database');
db.connect();

const clientRoutes = require('./routes/clientsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const userRoutes = require('./routes/userRoutes');

app.use("/client", clientRoutes);
app.use("/order", ordersRoutes);
app.use("/user", userRoutes);

module.exports = app;

