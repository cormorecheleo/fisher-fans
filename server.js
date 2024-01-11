const express = require('express');
const mongoose = require('mongoose');
const boatRoutes = require('./routes/boat.route'); 
const authRoutes = require('./routes/auth.route');
const fishingLogRoutes = require('./routes/fishingLog.route');
const userRoutes = require('./routes/user.route');
const reservationRoutes = require('./routes/reservations.route');
const tripRoutes = require('./routes/trip.route');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/boats', boatRoutes);
app.use('/fishing-log', fishingLogRoutes);
app.use('/users', userRoutes);
app.use('/reservations', reservationRoutes);
app.use('/trips', tripRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;