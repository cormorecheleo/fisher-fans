const express = require('express');
const fishingLogController = require('../controllers/fishingLogController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/', fishingLogController.createFishingLog);
router.get('/', fishingLogController.getAllFishingLogs);
router.put('/:fishingLogId', fishingLogController.updateFishingLog);
router.delete('/:fishingLogId', fishingLogController.deleteFishingLog);
router.get('/search', fishingLogController.searchFishingLog);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: FishingLog
 *   description: FishingLog operations
 *
 * @swagger
 * components:
 *   schemas:
 *     FishingLog:
 *       type: object
 *       properties:
 *         fishName:
 *           type: string
 *           description: Name of the fish
 *         pictureUrl:
 *           type: string
 *           description: URL of the fish picture
 *         comment:
 *           type: string
 *           description: Comment about the fishing experience
 *         length:
 *           type: number
 *           description: Length of the fish
 *         weight:
 *           type: number
 *           description: Weight of the fish
 *         place:
 *           type: string
 *           description: Location where the fish was caught
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the fishing experience
 *         releaseFish:
 *           type: boolean
 *           description: Indicates if the fish was released
 *         ownerFishingLogId:
 *           type: string
 *           description: ID of the owner (User) of the fishing log
 */


/**
 * @swagger
 * /fishing-log:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Create a new fishing log
 *     tags: [FishingLog]
 *     requestBody:
 *       description: Fishing log object to be added
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FishingLog'
 *     responses:
 *       201:
 *         description: Fishing log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FishingLog'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get all fishing logs
 *     tags: [FishingLog]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FishingLog'
 *       500:
 *         description: Internal Server Error
 *
 * /fishing-log/{fishingLogId}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     summary: Update a fishing log by ID
 *     tags: [FishingLog]
 *     parameters:
 *       - in: path
 *         name: fishingLogId
 *         required: true
 *         description: ID of the fishing log to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Fishing log object to be updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FishingLog'
 *     responses:
 *       200:
 *         description: Fishing log updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FishingLog'
 *       400:
 *         description: Bad Request
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     summary: Delete a fishing log by ID
 *     tags: [FishingLog]
 *     parameters:
 *       - in: path
 *         name: fishingLogId
 *         required: true
 *         description: ID of the fishing log to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fishing log deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 *
 * /fishing-log/search:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Search for fishing logs
 *     tags: [FishingLog]
 *     parameters:
 *       - in: query
 *         name: fishName
 *         description: Fish name for searching
 *         schema:
 *           type: string
 *       - in: query
 *         name: place
 *         description: Place for searching
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         description: Start date for searching
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         description: End date for searching
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FishingLog'
 *       400:
 *         description: Bad Request
 */