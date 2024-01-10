var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const db = require('./app/db/index');

var app = express();

// router
const sellerMenuRouter = require('./app/api/sellerMenu/router');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to SharePlate API',
  });
});

app.use('/api', sellerMenuRouter);

module.exports = app;
