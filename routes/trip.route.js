const express = require('express');
const tripController = require('../controllers/tripController');
const router = express.Router();

router.post('/trips', tripController.createTrip);
router.put('/trips/:tripId', tripController.updateTrip);

module.exports = router;
