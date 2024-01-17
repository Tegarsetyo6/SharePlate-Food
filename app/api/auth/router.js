const express = require('express');
const router = express();
const { signInCms } = require('../auth/controller');

router.post('/auth/signin', signInCms);

module.exports = router;
