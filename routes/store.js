const router = require('express').Router()
const storeCtrl = require('../controllers/store');
const { protect } = require('../middlewares/auth');



router.get('/store', protect,  storeCtrl.getStore);



module.exports = router