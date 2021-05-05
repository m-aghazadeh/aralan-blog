module.exports = app => {
    app.use((req, res, next) => {
        const errors = req.flash('errors');
        const hasError = errors.length > 0;

        res.adminRender = (template, options) => {
            res.render(template, {...options, layout: 'admin', hasError, errors});
        }
        next();
    });
}