const express = require('express');
const boatController = require('../controllers/boatController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/', authenticate, boatController.createBoat);
router.get('/user', authenticate, boatController.getUserBoats)
router.get('/all', boatController.getAllBoats);
router.get('/search', boatController.searchBoats);
router.get('/list', boatController.findBoatByGeo);
router.put('/:boatId', boatController.updateBoat);
router.delete('/:boatId', boatController.deleteBoat);

module.exports = router;
