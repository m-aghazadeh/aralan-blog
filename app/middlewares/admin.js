const userRoles = require('../models/user/userRoles')
module.exports = (req, res, next) => {
    const userRole = req.session.user.role;
    if (userRole !== userRoles.ADMIN) {
        return res.redirect('/');
    }
    next();
}