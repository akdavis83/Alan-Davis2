const router = require('express').Router()
const ctrl = require('../controllers/auth');
const { protect } = require('../middlewares/auth');
const {login, register} = require('../validation/auth');



router.get('/login', protect, ctrl.getLogin);
router.get('/register', protect, ctrl.getRegister);
router.get('/logout',  protect, ctrl.getLogout);
router.post('/login', login(), ctrl.postLogin);
router.post('/register', register() , ctrl.postRegister);

module.exports = router