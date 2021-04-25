const express = require('express');
const router = express.Router();
const postsController = require('../../controllers/admin/posts');

router.get('/', postsController.index);
router.get('/create', postsController.create);
router.post('/store', postsController.store);
router.get('/delete/:postId', postsController.remove);
router.get('/edit/:postId', postsController.edit);
router.post('/update/:postId', postsController.update);

module.exports = router;