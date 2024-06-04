const router = require('express').Router()
const store2Ctrl = require('../controllers/store2');
const { protect } = require('../middlewares/auth');



router.get('/store2', protect,  store2Ctrl.Store2);


module.exports = router