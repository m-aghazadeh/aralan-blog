const postModel = require('../../models/post');
const PostPresenter = require('../../presenters/post')
const userModel = require('../../models/user');
const userService = require('../../services/userService');

module.exports.single = async (req, res) => {
    const postSlug = req.params.postSlug;
    const post = await postModel.findBySlug(postSlug);
    if (!post) {
        return res.redirect('/404')
    }
    const user = await userModel.find(post.author_id);
    user.avatar = userService.gravatar(user.email)
    post.author = user;
    res.frontRender('front/single', {post})
}