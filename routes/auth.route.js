const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

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
 *         - photoURL
 *         - boatLicenseNumber
 *         - insuranceNumber
 *         - status
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           example: 1990-01-01
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         phone:
 *           type: string
 *           example: +1234567890
 *         address:
 *           type: string
 *           example: 123 Main St
 *         postalCode:
 *           type: string
 *           example: 12345
 *         city:
 *           type: string
 *           example: Cityville
 *         spokenLanguages:
 *           type: array
 *           items:
 *             type: string
 *           example: ['English', 'French']
 *         photoURL:
 *           type: string
 *           example: http://example.com/photo.jpg
 *         boatLicenseNumber:
 *           type: string
 *           example: ABCD1234
 *         insuranceNumber:
 *           type: string
 *           example: 123456789012
 *         status:
 *           type: string
 *           enum: ['particulier', 'professionnel']
 *           example: particulier
 *         companyName:
 *           type: string
 *           example: ACME Boats
 *         activityType:
 *           type: string
 *           enum: ['location', 'guide de pêche']
 *           example: location
 *         siretNumber:
 *           type: string
 *           example: 12345678900001
 *         rcNumber:
 *           type: string
 *           example: RC12345
 *         password:
 *           type: string
 *           format: password
 *           minLength: 8
 *           maxLength: 16
 *           example: password123
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
 *     requestBody:
 *       description: User object to be added
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User signed up successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 * /auth/login:
 *   post:
 *     summary: Login with user credentials
 *     tags: [Auth]
 *     requestBody:
 *       description: User credentials
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johnwd@doe.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *                 format: password
 *                 minLength: 8
 *                 maxLength: 16
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
