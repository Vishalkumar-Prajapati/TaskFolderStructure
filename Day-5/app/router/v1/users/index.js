const users = require('express').Router();
const controller = require('./lib/controller');
const middleware = require('./lib/middleware');
const validiter = require('./lib/validator');

users.get('/', (req, res) => res.send('you are in users js'));

users.post('/login', validiter.login, middleware.login, controller.login);
users.post('/register', validiter.register, middleware.register, controller.register);
users.patch('/update/password', validiter.password, middleware.verifyToken, middleware.password, controller.password);
users.patch('/update/user', validiter.user, middleware.verifyToken, controller.user);

module.exports = users;
