const express = require('express');
const router = express();
const { signup, signin, getAllLandingPage, getDetailLandingPage, getDashboard, checkout } = require('./controller');

const { authenticateParticipant } = require('../../middlewares/auth');

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.get('/events', authenticateParticipant, getAllLandingPage);
router.get('/events/:id', getDetailLandingPage);
router.get('/orders', authenticateParticipant, getDashboard);
router.post('/checkout', authenticateParticipant, checkout);

module.exports = router;
