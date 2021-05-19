const userService = require('../services/userService');
module.exports = app => {
    app.use((req, res, next) => {
        const errors = req.flash('errors');
        const success = req.flash('success');
        const hasError = errors.length > 0;

        let user = null;
        if ('user' in req.session) {
            user = req.session.user;
            user.avatar = userService.gravatar(user.email);
        }

        res.frontRender = (template, options) => {
            res.render(template, {...options, layout: 'front'});
        }

        res.newRender = (template, options) => {
            res.render(template, {...options, hasError, errors, success});
        }

        res.adminRender = (template, options) => {
            res.render(template, {...options, layout: 'admin', user, hasError, errors, success});
        }
        next();
    });
}