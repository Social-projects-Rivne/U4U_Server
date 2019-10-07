const express = require('express');
const { check } = require('express-validator');
const valid = require('../middlewares/express-validation');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', [
  check('email', 'Email is invalid')
    .not().isEmpty()
    .isEmail()
    .normalizeEmail(),
  check('password', 'Password cannot be empty string')
    .not().isEmpty(),
], valid, authController.login);

router.put('/refresh-token', [
  check('refreshToken')
    .not().isEmpty()
    .isString(),
], valid, authController.refreshToken);

router.post('/check-auth', [
  check('token')
    .not().isEmpty()
    .isString()], valid, authController.checkToken);


module.exports = router;
