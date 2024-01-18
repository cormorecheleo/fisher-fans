const express = require('express');
const tripController = require('../controllers/tripController');
const router = express.Router();

router.post('/', tripController.createTrip);
router.get('/', tripController.getAllTrips);
router.put('/:tripId', tripController.updateTrip);
router.delete('/:tripId', tripController.deleteTrip);
router.get('/search', tripController.searchTrips);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Operations related to fishing trips
 *
 * @swagger
 * /trips:
 *   post:
 *     summary: Create a new fishing trip
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TripInput'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       '400':
 *         description: Bad Request
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword for trips
 *       - in: query
 *         name: minDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Minimum date for trips
 *       - in: query
 *         name: maxDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Maximum date for trips
 *       - in: query
 *         name: minPassengers
 *         schema:
 *           type: integer
 *         description: Minimum number of passengers
 *       - in: query
 *         name: maxPassengers
 *         schema:
 *           type: integer
 *         description: Maximum number of passengers
 *   get:
 *     summary: Get all fishing trips
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 *       '500':
 *         description: Internal Server Error
 * /trips/{tripId}:
 *   put:
 *     summary: Update a fishing trip
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the trip to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TripInput'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       '400':
 *         description: Bad Request
 *   delete:
 *     summary: Delete a fishing trip
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the trip to delete
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 * /trips/search:
 *   get:
 *     summary: Search for fishing trips based on criteria
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword for trips
 *       - in: query
 *         name: minDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Minimum date for trips
 *       - in: query
 *         name: maxDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Maximum date for trips
 *       - in: query
 *         name: minPassengers
 *         schema:
 *           type: integer
 *         description: Minimum number of passengers
 *       - in: query
 *         name: maxPassengers
 *         schema:
 *           type: integer
 *         description: Maximum number of passengers
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Trip:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the trip
 *           example: 61e468773cc1ad001b3e2b2a
 *         title:
 *           type: string
 *           description: Title of the trip
 *           example: Fishing Trip 1
 *         informationsPratiques:
 *           type: string
 *           description: Practical information about the trip
 *           example: Bring your fishing gear
 *         typeSortie:
 *           type: string
 *           description: Type of the fishing trip (journaliere or recurrente)
 *           example: journaliere
 *         typeTarif:
 *           type: string
 *           description: Type of tariff (global or par personne)
 *           example: global
 *         datesDebut:
 *           type: string
 *           format: date
 *           description: Start date of the trip
 *           example: 2023-01-01
 *         datesFin:
 *           type: string
 *           format: date
 *           description: End date of the trip
 *           example: 2023-01-10
 *         heuresDepart:
 *           type: string
 *           description: Departure time of the trip
 *           example: 08:00 AM
 *         heuresFin:
 *           type: string
 *           description: End time of the trip
 *           example: 04:00 PM
 *         nombrePassagers:
 *           type: integer
 *           description: Number of passengers for the trip
 *           example: 5
 *         prixSortie:
 *           type: number
 *           description: Price of the trip
 *           example: 100.50
 *         utilisateurOrigine:
 *           type: string
 *           description: ID of the user who initiated the trip
 *           example: 61e468773cc1ad001b3e2b2b
 *         boat:
 *           type: string
 *           description: ID of the boat used for the trip
 *           example: 61e468773cc1ad001b3e2b2c
 *     TripInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the trip
 *           example: Fishing Trip 1
 *         informationsPratiques:
 *           type: string
 *           description: Practical information about the trip
 *           example: Bring your fishing gear
 *         typeSortie:
 *           type: string
 *           description: Type of the fishing trip (journaliere or recurrente)
 *           example: journaliere
 *         typeTarif:
 *           type: string
 *           description: Type of tariff (global or par personne)
 *           example: global
 *         datesDebut:
 *           type: string
 *           format: date
 *           description: Start date of the trip
 *           example: 2023-01-01
 *         datesFin:
 *           type: string
 *           format: date
 *           description: End date of the trip
 *           example: 2023-01-10
 *         heuresDepart:
 *           type: string
 *           description: Departure time of the trip
 *           example: 08:00 AM
 *         heuresFin:
 *           type: string
 *           description: End time of the trip
 *           example: 04:00 PM
 *         nombrePassagers:
 *           type: integer
 *           description: Number of passengers for the trip
 *           example: 5
 *         prixSortie:
 *           type: number
 *           description: Price of the trip
 *           example: 100.50
 *         boat:
 *           type: string
 *           description: ID of the boat used for the trip
 *           example: 61e468773cc1ad001b3e2b2c
 */
