const users = require('express').Router();
const bodyParser = require('body-parser');
const controller = require('./lib/controller');
const middleware = require('./lib/middleware');
const validiter = require('./lib/validator');

users.get('/', (req, res) => res.send('you are in users js'));

users.use(bodyParser.json());

users.post('/register', validiter.register, middleware.readDatabase, middleware.register, controller.register);
users.patch('/update/password', validiter.password, middleware.readDatabase, middleware.password, controller.password);
users.patch('/update/user', validiter.user, middleware.readDatabase, middleware.user, controller.user);

module.exports = users;
