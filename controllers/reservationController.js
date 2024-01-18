const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Trip = require('../models/Trip');
const mongoose = require('mongoose');

const reservationController = {
  createReservation: async (req, res) => {
    const userId = req.userId;
    try {
      const user = await User.findById(userId);
      const trip = await Trip.findById(req.body.trip);
      if (!user || !trip) {
        return res.status(404).json({ error: 'User or trip not found' });
      }

      const reservationData = {
        DateRetenue: req.body.DateRetenue,
        NombreDePlacesReservees: req.body.NombreDePlacesReservees,
        PrixTotal: req.body.PrixTotal,
        user: user._id,
        trip: trip._id,
      };

      const reservation = await Reservation.create(reservationData);
      res.status(201).json(reservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllReservations: async (req, res) => {
    try {
      const reservations = await Reservation.find()
        .populate('user')
        .populate('trip');
      res.json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getReservationById: async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.reservationId)
        .populate('user')
        .populate('trip');

      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }

      res.json(reservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateReservation: async (req, res) => {
    try {
      const reservation = await Reservation.findByIdAndUpdate(
        req.params.reservationId,
        req.body,
        { new: true }
      )
        .populate('user')
        .populate('trip');

      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }

      res.json(reservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteReservation: async (req, res) => {
    try {
      const reservation = await Reservation.findByIdAndDelete(
        req.params.reservationId
      )
        .populate('user')
        .populate('trip');

      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }

      res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  searchReservations: async (req, res) => {
    try {
      const { startDate, endDate, userId, tripId } = req.query;
      const searchCriteria = {};

      // Add search criteria based on query parameters
      if (startDate) {
        searchCriteria.DateRetenue = { $gte: new Date(startDate) };
      }
      if (endDate) {
        searchCriteria.DateRetenue = {
          ...searchCriteria.DateRetenue,
          $lte: new Date(endDate),
        };
      }
      if (userId) {
        searchCriteria.user = userId;
      }
      if (tripId) {
        searchCriteria.trip = tripId;
      }

      const reservations = await Reservation.find(searchCriteria)
        .populate('user')
        .populate('trip');

      res.json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = reservationController;
