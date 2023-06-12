const mongoose = require('mongoose');

const transactions = new mongoose.Schema({
    iCarId: {type: mongoose.Schema.Types.ObjectId ,ref :'cars'},
    iSellerId: {type: mongoose.Schema.Types.ObjectId ,ref :'seller'},
    iUserId: {type: mongoose.Schema.Types.ObjectId ,ref :'user'}
});

module.exports = mongoose.model('transactions', transactions);
