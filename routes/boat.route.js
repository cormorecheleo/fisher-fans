const express = require('express');
const boatController = require('../controllers/boatController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/', boatController.createBoat);
router.get('/user', boatController.getUserBoats)
router.get('/all', boatController.getAllBoats);
router.get('/search', boatController.searchBoats);
router.get('/list', boatController.findBoatByGeo);
router.put('/:boatId', boatController.updateBoat);
router.delete('/:boatId', boatController.deleteBoat);

module.exports = router;



/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Boat
 *   description: Boat operations
 *
 * @swagger
 * /boats/all:
 *   get:
 *     security:
 *       - BearerAuth: [] 
 *     summary: Get all boats
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Boat'
 *       500:
 *         description: Internal Server Error
 * /boats:
 *   post:
 *     security:
 *       - BearerAuth: [] 
 *     summary: Create a new boat
 *     requestBody:
 *       description: Boat object to be added
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Boat'
 *     responses:
 *       201:
 *         description: Boat created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Boat'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 * /boats/user:
 *   get:
 *     security:
 *       - BearerAuth: [] 
 *     summary: Get boats associated with the authenticated user
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Boat'
 *       500:
 *         description: Internal Server Error
 *
 * /boats/{boatId}:
 *   put:
 *     security:
 *       - BearerAuth: [] 
 *     summary: Update a boat
 *     parameters:
 *       - in: path
 *         name: boatId
 *         required: true
 *         description: ID of the boat to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated boat object
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Boat'
 *     responses:
 *       200:
 *         description: Boat updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Boat'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 *   delete:
 *     security:
 *       - BearerAuth: [] 
 *     summary: Delete a boat
 *     parameters:
 *       - in: path
 *         name: boatId
 *         required: true
 *         description: ID of the boat to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Boat deleted successfully
 *       500:
 *         description: Internal Server Error
 *
 * /boats/search:
 *   get:
 *     security:
 *       - BearerAuth: [] 
 *     summary: Search for boats based on criteria
 *     parameters:
 *       - in: query
 *         name: keyword
 *         description: Keyword to search for in boat name or description
 *         schema:
 *           type: string
 *       - in: query
 *         name: minYear
 *         description: Minimum year of fabrication
 *         schema:
 *           type: integer
 *       - in: query
 *         name: maxYear
 *         description: Maximum year of fabrication
 *         schema:
 *           type: integer
 *       - in: query
 *         name: minPower
 *         description: Minimum engine power
 *         schema:
 *           type: integer
 *       - in: query
 *         name: maxPower
 *         description: Maximum engine power
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Boat'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Boat:
 *       type: object
 *       required:
 *         - Nom
 *         - Description
 *         - Marque
 *         - AnneeDeFabrication
 *         - URLDeLaPhoto
 *         - TypeDePermisRequis
 *         - TypeDeBateau
 *         - Equipements
 *         - MontantDeLaCaution
 *         - CapaciteMaximum
 *         - NombreDeCouchages
 *         - PortDAttache
 *         - PaysDAttache
 *         - Latitude
 *         - Longitude
 *         - TypeDeMotorisation
 *         - PuissanceDuMoteur
 *         - createdBy
 *       properties:
 *         Nom:
 *           type: string
 *         Description:
 *           type: string
 *         Marque:
 *           type: string
 *         AnneeDeFabrication:
 *           type: number
 *         URLDeLaPhoto:
 *           type: string
 *         TypeDePermisRequis:
 *           type: string
 *         TypeDeBateau:
 *           type: string
 *         Equipements:
 *           type: string
 *         MontantDeLaCaution:
 *           type: number
 *         CapaciteMaximum:
 *           type: number
 *         NombreDeCouchages:
 *           type: number
 *         PortDAttache:
 *           type: string
 *         PaysDAttache:
 *           type: string
 *         Latitude:
 *           type: number
 *         Longitude:
 *           type: number
 *         TypeDeMotorisation:
 *           type: string
 *         PuissanceDuMoteur:
 *           type: number
 *         createdBy:
 *           type: string
 *           format: uuid
 */
