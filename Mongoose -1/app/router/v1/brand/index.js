const brand = require('express').Router();
const controller = require('./lib/controller');
const middleware = require('./lib/middleware');
const validator = require('./lib/validator');

brand.post('/', validator.addBrand, middleware.addBrand, controller.addBrand);

module.exports = brand;
