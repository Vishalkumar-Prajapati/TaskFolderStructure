const mongoose = require('mongoose');

const admin = new mongoose.Schema({
    sName: String,
    sPassword: String
});

module.exports = mongoose.model('Admin', admin);
