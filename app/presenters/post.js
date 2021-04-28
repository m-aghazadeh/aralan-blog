const dateService = require('@services/dateService');
const langService = require('@services/langService');

module.exports = class {
    constructor(post) {
        post.created_at_jalali = langService.toPersianNumbers(dateService.toPersianDate(post.created_at));
        post.persianViews = langService.toPersianNumbers(post.views);
        return post;
    }
}