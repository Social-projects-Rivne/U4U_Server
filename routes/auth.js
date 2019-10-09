const express = require('express');
const valid = require('../middlewares/express-validation');
const authController = require('../controllers/authController');
const { auth } = require('../middlewares/route-validator');
const router = express.Router();


router.post('/login', valid(auth.login), authController.login);

router.post('/register', valid(auth.register), authController.register);

router.put('/refresh-token', valid(auth.refreshToken), authController.refreshToken);

router.post('/check-auth', valid(auth.checkAuth), authController.checkToken);

router.post('/log-out', valid(auth.logOut), authController.logOut);

module.exports = router;
