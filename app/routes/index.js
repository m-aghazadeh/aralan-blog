const adminRouter = require('./admin');
const authRouter = require('./auth');
const auth = require('../midlewares/auth')
const admin = require('../midlewares/admin');
const guest = require('../midlewares/guest');
const authControler = require('../controllers/auth');

module.exports = app => {
    app.use('/admin', [auth, admin], adminRouter);
    app.use('/auth', [guest], authRouter);
    app.get('/logout', authControler.logout);

}