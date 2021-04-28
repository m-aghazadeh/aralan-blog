const postsModel = require('@models/post');
const usersModel = require('@models/users');
const postStatuses = require('../../models/post/postStatus');
const postPresenter = require('../../presenters/post');

exports.index = async (req, res) => {
    const posts = await postsModel.findAll();
    const presentedPosts = posts.map(post => {
        post.presenter = new postPresenter(post);
        return post;
    });
    res.render('admin/posts/index', {layout: 'admin', presentedPosts});
}

exports.create = async (req, res) => {
    const users = await usersModel.findAll(['id', 'full_name']);
    res.render('admin/posts/create', {layout: 'admin', users});
}

exports.store = async (req, res) => {
    const errors = [];
    let hasError = false;
    const postData = {
        title: req.body.postTitle,
        slug: req.body.postSlug,
        content: req.body.postContent,
        status: req.body.postStatus,
        author_id: req.body.author_id,
    }

    if (postData.title === '') {
        hasError = true;
        errors.push('فیلد عنوان نمیتواند خالی باشد.')
    }

    if (postData.slug === '') {
        hasError = true;
        errors.push('فیلد نامک نمیتواند خالی باشد.')
    }

    if (postData.content === '') {
        hasError = true;
        errors.push('فیلد محتوا نمیتواند خالی باشد.')
    }

    if (hasError) {
        const users = await usersModel.findAll(['id', 'full_name']);
        res.render('admin/posts/create', {layout: 'admin', users, hasError, errors});
    } else {
        const insertId = await postsModel.create(postData);
        if (insertId) {
            res.redirect('/admin/posts');
        }
    }
}

exports.remove = async (req, res) => {
    const postId = req.params.postId;
    if (parseInt(postId) === 0) {
        res.redirect('/admin/posts');
    }
    const result = await postsModel.delete(postId);
    res.redirect('/admin/posts');
}

exports.edit = async (req, res) => {
    const postId = req.params.postId;
    if (parseInt(postId) === 0) {
        res.redirect('/admin/posts');
    }
    const post = await postsModel.find(postId);
    const users = await usersModel.findAll(['id', 'full_name']);
    res.render('admin/posts/edit', {
        layout: 'admin', users, post, postStatuses: postStatuses.statuses(),
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
    const update = await postsModel.update(postId, postData);
    res.redirect('/admin/posts');
}