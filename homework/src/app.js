const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv-safe').config();

const db = require('./config/database');
const clientRoutes = require('./routes/clientsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const userRoutes = require('./routes/userRoutes');

db.connect();

app.use(cors());
app.use(express.json());
app.use("/client", clientRoutes);
app.use("/order", ordersRoutes);
app.use("/user", userRoutes);

module.exports = app;

