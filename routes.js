const express = require('express');
const boatController = require('./controllers/boatController'); // Importing boatController for boat-related operations
const userController = require('./controllers/userController'); // Importing userController for user-related operations
const authController = require('./controllers/authController'); // Importing authController for authentication processes
const reservationController = require('./controllers/reservationController'); // Importing authController for authentication processes
const authenticate = require('./middlewares/authenticate');
const tripController = require('./controllers/tripController');
const fishingLogController = require('./controllers/fishingLogController');

const router = express.Router();


// Authentication Routes
router.post('/signup', authController.signup); // Route for user signup
router.post('/login', authController.login);   // Route for user login


// Boat Routes
router.post('/boats', authenticate ,boatController.createBoat); // Route to create a new boat
router.put('/boats/:boatId', boatController.updateBoat); // Route to update a specific boat by boatId
router.delete('/boats/:boatId', boatController.deleteBoat); // Route to delete a specific boat by boatId
router.get('/boats/search', boatController.searchBoats); // Route to search for boats based on query parameters
router.get('/boats/all', boatController.getAllBoats); // Route to search for boats based on query parameters

// Fishing Log Routes
router.post('/fishingLog', authenticate , fishingLogController.createFishingLog); // Route to create a new boat
router.put('/fishingLog/:fishingLogId', fishingLogController.updateFishingLog); // Route to update a specific boat by boatId
router.delete('/fishingLog/:fishingLogId', fishingLogController.deleteFishingLog); // Route to delete a specific boat by boatId
router.get('/fishingLog/search', fishingLogController.searchFishingLog); // Route to search for boats based on query parameters

// The above 'search boats' route seems to be duplicated, which might be a mistake.
// Consider removing or modifying one of the duplicate routes.

// User Routes
router.post('/users', userController.createUser); // Route to create a new user
router.get('/users', userController.getUsers); // Route to retrieve all users
router.get('/users/:id', userController.getUser); // Route to retrieve a specific user by id
router.patch('/users/:id', userController.updateUser); // Route to update a specific user by id
router.delete('/users/:id', userController.deleteUser); // Route to delete a specific user by id

// Reservation routes 
router.post('/reservations',authenticate, reservationController.createReservation);
router.get('/reservations/:reservationId',authenticate, reservationController.getReservationById);
router.put('/reservations/:reservationId', authenticate,reservationController.updateReservation);
router.delete('/reservations/:reservationId', authenticate,reservationController.deleteReservation);
router.get('/reservations/search', authenticate,reservationController.searchReservations);
router.get('/reservations', authenticate,reservationController.getAllReservations);
// BF-23 : Récuperer la liste des bateaux dans une zone geo
router.get('/boats/list', boatController.findBoatByGeo);


/** TRIP ROUTES */

// POST route
router.post('/trips', tripController.createTrip);

// PUT update trip
router.put('/trips/:tripId', tripController.updateTrip);

module.exports = router;
