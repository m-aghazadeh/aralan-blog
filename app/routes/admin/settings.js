const express = require('express');
const router = express.Router();
const settingsController = require('../../controllers/admin/settings');

router.get('/', settingsController.index);
router.post('/store', settingsController.store);


module.exports = router;
