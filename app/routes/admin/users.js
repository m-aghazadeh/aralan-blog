const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/admin/users');

router.get('/', usersController.index);
router.get('/create', usersController.create);
router.post('/store', usersController.store);
router.get('/delete/:userId', usersController.remove);
router.get('/edit/:userId', usersController.edit);
router.post('/update/:userId', usersController.update);

module.exports = router;
