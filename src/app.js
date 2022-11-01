const express = require("express");
const app = express();
const cors = require('cors');

require('dotenv-safe').config();

const db = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

db.connect();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

module.exports = app;