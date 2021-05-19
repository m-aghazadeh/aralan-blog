const express = require('express');
const router = express.Router();
const frontController = require('../../controllers/front/home');
const postController = require('../../controllers/front/post');
const commentController = require('../../controllers/front/comment')

router.get('/', frontController.home);
router.get('/404', async (req, res) => {
    res.send('Page not found!')
})
router.get('/:postSlug', postController.showPost);
router.post('/:postSlug/comments', commentController.store);
module.exports = router;