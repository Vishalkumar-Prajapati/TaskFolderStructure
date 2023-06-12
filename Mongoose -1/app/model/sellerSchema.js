const mongoose = require('mongoose');

const seller = new mongoose.Schema({
    sSellerName: String,
    sCity: String,
    aCarIds: [{type: mongoose.Schema.Types.ObjectId,ref: 'cars'}],
});

module.exports = mongoose.model('seller', seller);