const express = require('express');
const router = express.Router();
const commentsController = require('../../controllers/admin/comments');

router.get('/', commentsController.index);
router.get('/delete/:commentId', commentsController.delete);
router.get('/reject/:commentId', commentsController.reject);
router.get('/approve/:commentId', commentsController.approve);

module.exports = router;