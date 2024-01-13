const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.get('/donationMenu', index);
router.get('/donationMenu/:id', find);
router.post('/donationMenu', create);
router.put('/donationMenu/:id', update);
router.delete('/donationMenu/:id', destroy);

module.exports = router;
