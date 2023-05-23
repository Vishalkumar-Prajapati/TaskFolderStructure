const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router/index');
const config = require('../config');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', router);

app.all('*', (_req, res) => {
  res.status(404).json({ sMessage: 'route not found' });
});

app.listen(config.PORT, (err) => {
  if (err) throw new Error(err);
  console.log('listening on port 3000');
});
