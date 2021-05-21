const postModel = require('../../models/post');
const PostPresenter = require('../../presenters/post')
const userModel = require('../../models/user');
const commentModel = require('../../models/comment');
const userService = require('../../services/userService');
const dateService = require('../../services/dateService');
const _ = require('lodash');
const settingModel = require('../../models/settings');

exports.showPost = async (req, res) => {
    const postSlug = req.params.postSlug;
    const post = await postModel.findBySlug(postSlug);
    if (!post) {
        return res.redirect('/404')
    }
    const user = await userModel.find(post.author_id);
    user.avatar = userService.gravatar(user.email);
    post.author = user;
    const comments = await commentModel.findByPostId(post.id);

    const presentedcomments = comments.map(comment => {
        comment.avatar = userService.gravatar(comment.user_email);
        comment.created_at_jalali = dateService.toPersianDate(comment.created_at);
        return comment;
    });

    let pageTitle = await settingModel.get('website_title');
    const newComments = _.groupBy(presentedcomments, 'parent');

    res.frontRender(
        'front/single', {
            post,
            comments: newComments[0],
            bodyClass: 'single-post',
            title: `${post.title} | ${pageTitle}`,
            helpers: {
                hasChildren: function (commentId) {
                    return commentId in newComments;
                },
                getChildren: function (commnetId) {
                    return newComments[commnetId];
                }
            }
        })
}