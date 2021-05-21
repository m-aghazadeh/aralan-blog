const userService = require('../services/userService');
const settingModel = require('../models/settings');
module.exports = app => {
    app.use(async (req, res, next) => {

        const errors = req.flash('errors');
        const success = req.flash('success');
        const hasError = errors.length > 0;

        let user = null;
        if ('user' in req.session) {
            user = req.session.user;
            user.avatar = userService.gravatar(user.email);
        }
        const title = await settingModel.get('website_title');
        const description = await settingModel.get('website_description');
        res.frontRender = (template, options) => {
            res.render(template, {
                title,
                description,
                layout: 'front',
                bodyClass: 'bg-gray', ...options,
            });
        }

        const usersCanRegister = parseInt(await settingModel.get('users_can_register'));
        res.newRender = (template, options) => {

            res.render(template, {...options, hasError, errors, success, usersCanRegister});
        }

        res.adminRender = (template, options) => {
            res.render(template, {...options, layout: 'admin', user, hasError, errors, success});
        }
        next();
    });
}