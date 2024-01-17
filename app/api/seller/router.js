const express = require('express');
const router = express();
const { signup, signin, getAllLandingPage, getDetailLandingPage, getDashboard } = require('./controller');

const { authenticateParticipant } = require('../../middlewares/auth');

router.post('/seller/auth/signup', signup);
router.post('/seller/auth/signin', signin);
router.get('/seller/events', authenticateParticipant, getAllLandingPage);
router.get('/seller/events/:id', getDetailLandingPage);
router.get('/seller/orders', authenticateParticipant, getDashboard);

module.exports = router;
