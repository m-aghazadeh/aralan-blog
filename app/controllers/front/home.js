const postModel = require('../../models/post');
const PostPresenter = require('../../presenters/post');
const settingModel = require('../../models/settings');

module.exports.home = async (req, res) => {
    const page = 'page' in req.query ? (parseInt(req.query.page) || 1) : 1;
    const perPage = parseInt(await settingModel.get('posts_per_page'));
    const totalPosts = await postModel.count();
    const totalPages = Math.ceil(totalPosts / perPage);

    const pagination = {
        page,
        totalPages,
        prevPage: page > 1 ? page - 1 : 1,
        nextPage: page < totalPages ? page + 1 : totalPages,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages
    }

    const posts = await postModel.findAll(page, perPage);
    const postsForPresent = posts.map(post => {
        const postPresenter = new PostPresenter(post);
        post.jalali_date = postPresenter.jalaliCreatedAt();
        post.excerpt = postPresenter.excerpt();
        return post;
    });
    if (!posts.length) {
        return res.redirect('/404');
    }
    res.frontRender('front/home', {
        posts: postsForPresent,
        pagination,
        helpers: {
            showDiabled: function (isDisabled) {
                return !isDisabled ? 'disabled' : '';
            }
        }
    });
}
