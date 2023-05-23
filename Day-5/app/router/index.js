const router = require('express').Router();
const users = require('./v1/users/index');
const usersv2 = require('./v2/users/index');

router.get('/', (req, res) => res.json({ sMessage: 'you are in router' }));
router.use('/v1/users', users);
router.use('/v2/users', usersv2);

module.exports = router;
