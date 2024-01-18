const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - dateOfBirth
 *         - email
 *         - phone
 *         - address
 *         - postalCode
 *         - city
 *         - spokenLanguages
 *         - boatLicenseNumber
 *         - insuranceNumber
 *         - status
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           required: true
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           required: true
 *         email:
 *           type: string
 *           required: true
 *         phone:
 *           type: string
 *           required: true
 *         address:
 *           type: string
 *           required: true
 *         postalCode:
 *           type: string
 *           required: true
 *         city:
 *           type: string
 *           required: true
 *         spokenLanguages:
 *           type: array
 *           items:
 *             type: string
 *         photoURL:
 *           type: string
 *         boatLicenseNumber:
 *           type: string
 *           minLength: 8
 *           maxLength: 8
 *           required: true
 *         insuranceNumber:
 *           type: string
 *           minLength: 12
 *           maxLength: 12
 *           required: true
 *         status:
 *           type: string
 *           enum:
 *             - particulier
 *             - professionnel
 *           required: true
 *         companyName:
 *           type: string
 *         activityType:
 *           type: string
 *           enum:
 *             - location
 *             - guide de pêche
 *         siretNumber:
 *           type: string
 *         rcNumber:
 *           type: string
 *         password:
 *           type: string
 *           required: true
 */

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User operations
 *
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: Successful operation
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 *   patch:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated user object
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */
