const express = require('express');

const boatController = require('./controllers/boatController'); // Path to your boatController
const tripController = require('./controllers/tripController');

// Router
const router = express.Router();

/** BOAT ROUTES */
// POST route to create a boat
router.post('/boats', boatController.createBoat);

// PUT route to update a boat
router.put('/boats/:boatId', boatController.updateBoat);

// DELETE route to delete a boat
router.delete('/boats/:boatId', boatController.deleteBoat);

// GET route to search for boats
router.get('/boats/search', boatController.searchBoats);


/** TRIP ROUTES */

// POST route
router.post('/trips', tripController.createTrip);

// PUT update trip
router.put('/trips/:tripId', tripController.updateTrip);

// ... include this router in your main server file
module.exports = router;