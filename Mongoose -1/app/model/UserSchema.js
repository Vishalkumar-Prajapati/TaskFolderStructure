const mongoose = require('mongoose');

const user = new mongoose.Schema({
    sName: String,
    sCity: String,
    // aCars : [{ type: mongoose.Schema.Types.ObjectId, ref: 'cars'}]
});

module.exports = mongoose.model('user', user);
