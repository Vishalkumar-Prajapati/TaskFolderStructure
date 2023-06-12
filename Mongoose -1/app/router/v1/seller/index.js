const seller = require('express').Router();
const controller = require('./lib/controller');
const middleware = require('./lib/middleware');
const validator = require('./lib/validator');

seller.post('/', validator.addSeller, middleware.addSeller, controller.addSeller);

module.exports = seller;
