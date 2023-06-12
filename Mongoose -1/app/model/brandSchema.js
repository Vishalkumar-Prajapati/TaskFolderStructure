const mongoose = require('mongoose');

const brand = new mongoose.Schema({
    sBrandName: String,
});

module.exports = mongoose.model('brand', brand);