const router = require('express').Router();
const user =require('./v1/user/index');
const seller = require('./v1/seller/index');
const brand = require('./v1/brand/index');
const transaction = require('./v1/transaction/index');
const cars = require('./v1/car/index');
const admin = require('./v1/admin/index');

router.use('/user',user);
router.use('/seller',seller);
router.use('/brand',brand);
router.use('/buyCar',transaction);
router.use('/cars',cars);
router.use('/admin',admin);

router.all('*', (_,res)=>{res.status(404).json({sMessage: 'route not found'});});

module.exports = router;