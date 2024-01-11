const express = require('express');
const fishingLogController = require('../controllers/fishingLogController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/fishingLog', authenticate, fishingLogController.createFishingLog);
router.put('/fishingLog/:fishingLogId', fishingLogController.updateFishingLog);
router.delete('/fishingLog/:fishingLogId', fishingLogController.deleteFishingLog);
router.get('/fishingLog/search', fishingLogController.searchFishingLog);

module.exports = router;
