const admin = require('express').Router();
const controller = require('./lib/controller');
const middleware = require('./lib/middleware');
const validator = require('./lib/validator');

admin.post('/addAdmin', validator.addAdmin, middleware.addAdmin, controller.addAdmin);
admin.post('/mostSoldCars',controller.mostSoldCars);
admin.post('/mostSoldCarsBrand',controller.mostSoldCarsBrand);
admin.post('/totalSoldCars',controller.totalSoldCars);
admin.post('/mostSoldCarsCity',controller.mostSoldCarsCity);

module.exports = admin;
