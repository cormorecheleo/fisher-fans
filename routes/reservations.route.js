const express = require('express');
const reservationController = require('../controllers/reservationController');
const router = express.Router();

router.post('/', reservationController.createReservation);
router.get('/:reservationId', reservationController.getReservationById);
router.put('/:reservationId', reservationController.updateReservation);
router.delete('/:reservationId', reservationController.deleteReservation);
router.get('/search', reservationController.searchReservations);
router.get('/', reservationController.getAllReservations);

module.exports = router;
