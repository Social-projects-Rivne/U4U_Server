const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);

router.put('/refresh-token', authController.refreshToken);

router.post('/check-auth', authController.checkToken);

router.post('/log-out', authController.logOut);


module.exports = router;
