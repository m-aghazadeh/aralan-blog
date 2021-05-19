const dateService = require('@services/dateService');
const langService = require('@services/langService');

module.exports = class {
    constructor(user) {
        user.created_at_jalali = langService.toPersianNumbers(dateService.toPersianDate(user.created_at));
        user.persianViews = langService.toPersianNumbers(user.views);
        return user;
    }
}