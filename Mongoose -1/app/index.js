const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router/index');
require('./database/connect');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/',router);


app.listen(8080,(err)=>{
    if(err) console.error(err);
    console.log('8080');
});