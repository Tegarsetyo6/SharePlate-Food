const express = require('express');
const router = express();
const { index } = require('../sellerMenu/controller');

router.get('/sellerMenu', index);

module.exports = router;
