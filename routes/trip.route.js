const express = require('express');
const tripController = require('../controllers/tripController');
const router = express.Router();

router.post('/', tripController.createTrip);
router.get('/', tripController.getAllTrips);
router.put('/:tripId', tripController.updateTrip);

module.exports = router;
