const adminRouter = require('./admin');
const authRouter = require('./auth');
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin');
const guest = require('../middlewares/guest');
const authControler = require('../controllers/auth');
const frontRouter = require('./front');
const fakeRouter = require('./faker')

module.exports = app => {
    app.use('/', frontRouter);
    app.use('/admin', [auth, admin], adminRouter);
    app.use('/auth', [guest], authRouter);
    app.use('/fake', fakeRouter);
    app.get('/logout', authControler.logout);

}