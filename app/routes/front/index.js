const express = require('express');
const router = express.Router();
const frontController = require('../../controllers/front/home');
const singlePostController = require('../../controllers/front/single')

router.get('/', frontController.home);
router.get('/404', async (req, res) => {
    res.send('Page not found!')
})
router.get('/:postSlug', singlePostController.single);
module.exports = router;