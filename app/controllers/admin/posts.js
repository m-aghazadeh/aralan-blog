const postsModel = require('../../models/posts');
exports.index = async (req, res) => {
    const posts = await postsModel.findAll();
    res.render('admin/posts/index', {layout: 'admin', posts});
}