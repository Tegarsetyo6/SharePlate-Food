const express = require('express');
const router = express();

const { createCMSUser } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../middlewares/auth');

// router.post('/organizers', authenticateUser, authorizeRoles('owner'), createCMSOrganizer);
router.post('/users', authenticateUser, createCMSUser);
// router.get('/users', authenticateUser, authorizeRoles('owner'), getCMSUsers);

module.exports = router;
