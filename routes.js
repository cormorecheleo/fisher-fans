const express = require('express');
const boatController = require('./controllers/boatController'); // Path to your boatController
const userController = require('./controllers/userController'); // Path to your userController
const router = express.Router();

// POST route to create a boat
router.post('/boats', boatController.createBoat);

// PUT route to update a boat
router.put('/boats/:boatId', boatController.updateBoat);

// DELETE route to delete a boat
router.delete('/boats/:boatId', boatController.deleteBoat);

// GET route to search for boats
router.get('/boats/search', boatController.searchBoats);

router.post('/users', userController.createUser);

router.get('/users', userController.getUsers);

router.get('/users/:id', userController.getUser);

router.patch('/users/:id', userController.updateUser);

router.delete('/users/:id', userController.deleteUser);

module.exports = router;