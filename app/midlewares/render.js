module.exports = app => {
    app.use((req, res, next) => {
        const errors = req.flash('errors');
        const success = req.flash('success');
        const hasError = errors.length > 0;

        res.newRender = (template, options) => {
            res.render(template, {...options, hasError, errors, success});
        }

        res.adminRender = (template, options) => {
            res.render(template, {...options, layout: 'admin', hasError, errors, success});
        }
        next();
    });
}