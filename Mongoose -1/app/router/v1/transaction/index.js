const transaction = require('express').Router();
const controller = require('./lib/controller');
const middleware = require('./lib/middleware');
const validator = require('./lib/validator');

transaction.post('/', validator.buyCar, middleware.buyCar, controller.buyCar);


module.exports = transaction;
