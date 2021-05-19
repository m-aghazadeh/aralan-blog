const express = require('express');
const router = express.Router();
const fakeController = require('../../controllers/faker')

router.get('/user/:num', fakeController.user);
router.get('/post/:num', fakeController.post);
router.get('/comment/:num', fakeController.comment);

module.exports = router;