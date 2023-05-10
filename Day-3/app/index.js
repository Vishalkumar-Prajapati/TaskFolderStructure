const express=require('express');
const router=require('./router/index');
// require('dotenv').config();
const config = require('../config.js');
const app= express();

app.use('/',router);

app.listen(config.PORT,(err) => {
    if(err)throw new Error(err);
    console.log('listening on port 3000');
});