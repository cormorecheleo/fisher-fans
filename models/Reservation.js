const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  DateRetenue: { type: Date, required: true },
  NombreDePlacesReservees: { type: Number, required: true },
  PrixTotal: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
