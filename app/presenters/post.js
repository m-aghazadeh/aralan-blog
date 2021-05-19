const dateService = require('../services/dateService');
const langService = require('../services/langService');

class PostPresenter {
    constructor(post) {
        this.post = post;
    }

    jalaliCreatedAt() {
        return langService.toPersianNumbers(dateService.toPersianDate(this.post.created_at));
    }

    getViewsAsFaNumber() {
        return langService.toPersianNumbers(this.post.views)
    }

    excerpt(words_limit = 20, suffix = ' ...') {
        const words = this.post.content.split(' ');
        if (words.length < words_limit) {
            return words.join(' ') + suffix;
        }
        return words.slice(0, words_limit - 1) + suffix;
    }
}

module.exports = PostPresenter;