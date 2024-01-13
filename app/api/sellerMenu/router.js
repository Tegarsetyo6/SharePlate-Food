const express = require('express');
const router = express();
const { index, create, destroy, update } = require('../sellerMenu/controller');
const { find } = require('../donationMenu/controller');

router.get('/sellerMenu', index);
router.post('/sellerMenu', create);
router.delete('/sellerMenu/:id', destroy);
router.put('/sellerMenu/:id', update);
router.get('/sellerMenu/:id', find);

module.exports = router;
