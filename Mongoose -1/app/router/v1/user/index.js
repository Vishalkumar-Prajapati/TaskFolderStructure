const user = require('express').Router();
const controller = require('./lib/controller');
const middleware = require('./lib/middleware');
const validator = require('./lib/validator');

user.post('/', validator.addUser, middleware.addUser, controller.addUser);

module.exports = user;
