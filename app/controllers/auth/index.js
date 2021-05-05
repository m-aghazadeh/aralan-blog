module.exports.showLogin = (reg, res) => {
    res.render('auth/login', {layout:'auth'});
}
module.exports.doLogin = (req, res) => {
    res.send(req.body);
}
module.exports.showRegister = (reg, res) => {
    res.render('auth/register', {layout:'auth'});
}
module.exports.doRegister = (reg, res) => {

}