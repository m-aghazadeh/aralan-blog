const postModel = require('../../models/post');
const commnetModel = require('../../models/comment')
exports.store = async (req, res) => {
    const post = await postModel.findBySlug(req.params.postSlug);
    if (!post) {
        return res.redirect('/404')
    }
    const {user_name, user_email, user_url, comment} = req.body;
    const commnetData = {
        author_id: 'user' in req.session ? req.session.user.id : null,
        post_id: post.id,
        user_name,
        user_email,
        user_url,
        comment
    }
    const result = await commnetModel.create(commnetData);
    if (result) {
        res.redirect(`/${post.slug}`)
    } else {
        res.redirect('/404')
    }
}