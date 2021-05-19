const postsModel = require('../../models/post');
const usersModel = require('../../models/user');
const postStatuses = require('../../models/post/postStatus');
const PostPresenter = require('../../presenters/post')
const postValidator = require('../../validators/post')

exports.index = async (req, res) => {
    const posts = await postsModel.findAll();
    const postsForPresent = posts.map(post => {
        const postPresenter = new PostPresenter(post);
        post.jalali_date = postPresenter.jalaliCreatedAt();
        post.views_fa_num = postPresenter.getViewsAsFaNumber();
        return post;
    });
    res.adminRender('admin/posts/index', {posts: postsForPresent});
}

exports.create = async (req, res) => {
    const users = await usersModel.findAll(['id', 'full_name']);
    res.adminRender('admin/posts/create', {users});
}

exports.store = async (req, res) => {
    const postData = {
        title: req.body.postTitle,
        slug: req.body.postSlug,
        content: req.body.postContent,
        status: req.body.postStatus,
        author_id: req.body.author_id,
    }
    const errors = postValidator.create(postData);

    if (errors.length > 0) {
        req.flash('errors', errors);
        res.redirect('/admin/posts/create');
    } else {
        const insertId = await postsModel.create(postData);
        if (insertId) {
            req.flash('success', 'پست با موفقیت ایجاد شد');
            res.redirect('/admin/posts');
        }
    }
}

exports.remove = async (req, res) => {
    const postId = req.params.postId;
    if (parseInt(postId) === 0) {
        res.redirect('/admin/posts');
    }
    await postsModel.delete(postId);
    res.redirect('/admin/posts');
}

exports.edit = async (req, res) => {
    const postId = req.params.postId;
    if (parseInt(postId) === 0) {
        res.redirect('/admin/posts');
    }
    const post = await postsModel.find(postId);
    const users = await usersModel.findAll(['id', 'full_name']);
    res.adminRender('admin/posts/edit', {
        users, post, postStatuses: postStatuses.statuses(),
        helpers: {
            isPostAuthor: function (userId, options) {
                return userId === post.author_id ? options.fn(this) : options.inverse(this);
            },
            isSelectedStatus: function (status, options) {
                return status === post.status ? options.fn(this) : options.inverse(this);
            },
            postStatusAsText: function (status) {
                return postStatuses.statusesAsText(status);
            },
        }
    });
}

exports.update = async (req, res) => {
    const postId = req.params.postId;
    if (parseInt(postId) === 0) {
        res.redirect('/admin/posts');
    }
    const postData = {
        title: req.body.postTitle,
        slug: req.body.postSlug,
        content: req.body.postContent,
        status: req.body.postStatus,
        author_id: req.body.author_id,
    }
    await postsModel.update(postId, postData);
    req.flash('success', 'پست با موفقیت بروزرسانی شد');
    res.redirect('/admin/posts');
}