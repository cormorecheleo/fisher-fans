const express = require('express');
const reservationController = require('../controllers/reservationController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/reservations', authenticate, reservationController.createReservation);
router.get('/reservations/:reservationId', authenticate, reservationController.getReservationById);
router.put('/reservations/:reservationId', authenticate, reservationController.updateReservation);
router.delete('/reservations/:reservationId', authenticate, reservationController.deleteReservation);
router.get('/reservations/search', authenticate, reservationController.searchReservations);
router.get('/reservations', authenticate, reservationController.getAllReservations);

module.exports = router;
