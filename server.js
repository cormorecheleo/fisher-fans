const express = require('express');
const mongoose = require('mongoose');
const boatRoutes = require('./routes'); 
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(boatRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;