const userModel = require('../../models/user');
const userValidator = require('../../validators/user');
const userRoles = require('../../models/user/userRoles')

exports.index = async (req, res) => {
    const users = await userModel.findAll();
    res.adminRender('admin/users/index', {users});
}

exports.create = async (req, res) => {
    res.adminRender('admin/users/create');
}

exports.store = async (req, res) => {

    const userData = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    }

    const errors = userValidator.create(userData);

    if (errors.length > 0) {
        req.flash('errors', errors);
        res.redirect('/admin/users/create');
    } else {
        const insertId = await userModel.create(userData);
        if (insertId) {
            req.flash('success', 'کاربر با موفقیت ایجاد شد');
            res.redirect('/admin/users');
        }
    }
}

exports.remove = async (req, res) => {
    const userId = req.params.userId;
    if (parseInt(userId) === 0) {
        res.redirect('/admin/users');
    }
    const result = await userModel.delete(userId);
    req.flash('success', `کاربار ${result} با موفقیت حذف شد.`);
    res.redirect('/admin/users');
}

exports.edit = async (req, res) => {
    const userId = req.params.userId;
    if (parseInt(userId) === 0) {
        res.redirect('/admin/users');
    }
    const user = await userModel.find(userId);
    res.adminRender('admin/users/edit', {
        user, userRoles: userRoles.roles(),
        helpers: {
            userStatusAsText: function (role) {
                return userRoles.rolesAsText(role);
            },
            isSelectedRole: function (role, options) {
                return role === user.role ? options.fn(this) : options.inverse(this);
            }
        }
    });
}

exports.update = async (req, res) => {
    const userId = req.params.userId;
    if (parseInt(userId) === 0) {
        res.redirect('/admin/users');
    }
    const userData = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    }
    const update = await userModel.update(userId, userData);
    req.flash('success', 'اطلاعات کاربر بروز رسانی شد');
    res.redirect('/admin/users');
}