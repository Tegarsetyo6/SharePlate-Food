var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const db = require('./app/db/index');
var app = express();

// router
const sellerMenuRouter = require('./app/api/sellerMenu/router');
const donationMenuRouter = require('./app/api/donationMenu/router');
const usersRouter = require('./app/api/users/router');
const authCMSRouter = require('./app/api/auth/router');
const recipientsRouter = require('./app/api/recipients/router');
const ordersRouter = require('./app/api/orders/router');
const sellersRouter = require('./app/api/seller/router');

const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

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
app.use('/api', donationMenuRouter);
app.use('/api', usersRouter);
app.use('/api', authCMSRouter);
app.use('/api', recipientsRouter);
app.use('/api', ordersRouter);
app.use('/api', sellersRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
