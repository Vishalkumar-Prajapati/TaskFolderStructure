const cars = require('express').Router();
const controller = require('./lib/controller');
const middleware = require('./lib/middleware');
const validator = require('./lib/validator');

cars.post('/', validator.addCar, middleware.addCar, controller.addCar);

module.exports = cars;
