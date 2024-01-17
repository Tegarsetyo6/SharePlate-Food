const express = require('express');
const router = express();
const { index, create } = require('./controller');

const { authenticateParticipant } = require('../../middlewares/auth');

router.get('/orders', index);
router.post('/orders', authenticateParticipant, create);

module.exports = router;
