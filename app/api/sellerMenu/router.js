const express = require('express');
const router = express();
const { index, create, destroy, update } = require('../sellerMenu/controller');

router.get('/sellerMenu', index);
router.post('/sellerMenu', create);
router.delete('/sellerMenu/:id', destroy);
router.put('/sellerMenu/:id', update);

module.exports = router;
