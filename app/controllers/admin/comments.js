const commentsModel = require('../../models/comment');
const commentStatuses = require('../../models/comment/commentStatus');
const langService = require('../../services/langService');
const dateService = require('../../services/dateService');
const userService = require('../../services/userService');


exports.index = async (req, res) => {
    const comments = await commentsModel.findAll();
    const presentedComments = comments.map(comment => {
        comment.created_at_jalali = langService.toPersianNumbers(dateService.toPersianDate(comment.created_at));
        comment.user_avatar = userService.gravatar(comment.email);
        return comment;
    });
    res.adminRender('admin/comments/index', {
        presentedComments, helpers: {
            commentBackgroundCss: function (status) {
                let cssClasses = 'alert ';
                switch (status) {
                    case commentStatuses.REVIEW: {
                        cssClasses += 'alert-dark';
                        break;
                    }
                    case commentStatuses.REJECTED: {
                        cssClasses += 'alert-danger';
                        break;
                    }
                    case commentStatuses.APPROVED: {
                        cssClasses += 'alert-success';
                        break;
                    }
                }
                return cssClasses;
            }
        }
    });
}

exports.reject = async (req, res) => {
    await commentsModel.reject(req.params.commentId);
    res.redirect('/admin/comments');
}
exports.delete = async (req, res) => {
    await commentsModel.delete(req.params.commentId);
    res.redirect('/admin/comments');
}
exports.approve = async (req, res) => {
    await commentsModel.approve(req.params.commentId);
    res.redirect('/admin/comments');
}
