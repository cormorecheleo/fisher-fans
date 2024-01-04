const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Boat = require('../models/Boat');
const mongoose = require('mongoose');

const reservationController = {
  createReservation: async (req, res) => {
    try {
      const user = await User.findById(req.body.userId);
      const boat = await Boat.findById(req.body.boatId);
      if (!user || !boat) {
        return res.status(404).json({ error: 'User or boat not found' });
      }

      const reservationData = {
        DateRetenue: req.body.DateRetenue,
        NombreDePlacesReservees: req.body.NombreDePlacesReservees,
        PrixTotal: req.body.PrixTotal,
        user: user._id,
        boat: boat._id,
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
        .populate('boat');
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
        .populate('boat');

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
        .populate('boat');

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
        .populate('boat');

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
      const { startDate, endDate, userId, boatId } = req.query;
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
      if (boatId) {
        searchCriteria.boat = boatId;
      }

      const reservations = await Reservation.find(searchCriteria)
        .populate('user')
        .populate('boat');

      res.json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = reservationController;
