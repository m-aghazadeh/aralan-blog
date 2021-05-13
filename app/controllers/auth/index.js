const authService = require('../../services/authService');
const userModule = require('../../models/user')
const userRoles = require('../../models/user/userRoles');

module.exports.showLogin = (req, res) => {
    res.newRender('auth/login', {layout: 'auth'});
}

module.exports.doLogin = async (req, res) => {
    const {email, password} = req.body;
    const user = await authService.login(email, password);

    if (!user) {
        req.flash('errors', ['ایمیل یا کلمه عبور صحیح نمیباشید']);
        return res.redirect('/auth/login');
    }

    req.session.user = user;
    const pathToRedirect = user.role === userRoles.ADMIN ? '/admin/dashboard/' : '/';
    return res.redirect(pathToRedirect);
}

module.exports.showRegister = (req, res) => {
    res.newRender('auth/register', {layout: 'auth'});
}

module.exports.doRegister = async (req, res) => {
    const userData = {
        full_name: 'کاربر ناشناس',
        email: req.body.email,
        password: req.body.password,
        role: userRoles.USER
    };
    const nweUserId = await userModule.create(userData);
    res.redirect('/auth/login');
}

module.exports.logout = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
}