const mongoose = require('mongoose');

const car = new mongoose.Schema({
    sCarName: String,
    iBrandId: { type: mongoose.Schema.Types.ObjectId, ref: 'brand' },
});

module.exports = mongoose.model('cars', car);
