const express = require('express');
const boatController = require('../controllers/boatController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/boats', authenticate, boatController.createBoat);
router.put('/boats/:boatId', boatController.updateBoat);
router.delete('/boats/:boatId', boatController.deleteBoat);
router.get('/boats/search', boatController.searchBoats);
router.get('/boats/all', boatController.getAllBoats);
router.get('/boats/list', boatController.findBoatByGeo);

module.exports = router;
