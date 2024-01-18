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

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - DateRetenue
 *         - NombreDePlacesReservees
 *         - PrixTotal
 *         - user
 *         - trip
 *       properties:
 *         DateRetenue:
 *           type: string
 *           format: date
 *         NombreDePlacesReservees:
 *           type: integer
 *         PrixTotal:
 *           type: number
 *         user:
 *           type: string
 *           format: uuid
 *         trip:
 *           type: string
 *           format: uuid
 */

/**
 * @swagger
 * tags:
 *   name: Reservation
 *   description: Reservation operations
 *
 * @swagger
 * /reservations:
 *   post:
 *     security:
 *       - BearerAuth: [] 
 *     summary: Create a new reservation
 *     tags: [Reservation]
 *     requestBody:
 *       description: Reservation object to be added
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User or trip not found
 *       500:
 *         description: Internal Server Error
 *
 * /reservations/{reservationId}:
 *   get:
 *     security:
 *       - BearerAuth: [] 
 *     summary: Get a reservation by ID
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         description: ID of the reservation to retrieve
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Internal Server Error
 *
 *   put:
 *     security:
 *       - BearerAuth: [] 
 *     summary: Update a reservation
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         description: ID of the reservation to update
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       description: Updated reservation object
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Internal Server Error
 *
 *   delete:
 *     security:
 *       - BearerAuth: [] 
 *     summary: Delete a reservation
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         description: ID of the reservation to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Internal Server Error
 *
 * /reservations/search:
 *   get:
 *     security:
 *       - BearerAuth: [] 
 *     summary: Search for reservations based on criteria
 *     tags: [Reservation]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         description: Start date for reservation search
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         description: End date for reservation search
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: userId
 *         description: User ID for reservation search
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: tripId
 *         description: Trip ID for reservation search
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Internal Server Error
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

