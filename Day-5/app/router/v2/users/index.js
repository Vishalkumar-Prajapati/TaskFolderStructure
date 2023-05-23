const users = require('express').Router();
const controller = require('./lib/controller');
const middleware = require('./lib/middleware');
const validiter = require('./lib/validator');

users.get('/', (req, res) => res.json({ sMessage: 'you are in users js' }));

users.post('/login', validiter.loginUser, middleware.loginUser, controller.loginUser);
users.post('/register', validiter.registerUser, middleware.registerUser, controller.registerUser);
users.patch('/update/password', validiter.changePassword, middleware.verifyToken, middleware.password, controller.changePassword);
users.patch('/update/userName', validiter.changeUserName, middleware.verifyToken, controller.changeUserName);

module.exports = users;
