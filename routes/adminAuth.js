const express = require('express');
const { check } = require('express-validator');
const valid = require('../middlewares/express-validation');
const adminAuthController = require('../controllers/adminAuthController');

const router = express.Router();

router.post('/login', [
  check('email', 'Email is invalid!')
    .not().isEmpty()
    .isEmail()
    .normalizeEmail(),
  check('password', 'Password cannot be empty!')
    .not().isEmpty(),
], valid, adminAuthController.login);

router.post('/refresh-token', [
  check('refreshToken')
    .not().isEmpty()
    .isString(),
], valid, adminAuthController.refreshToken);

router.post('/check-token', [
  check('accessToken')
    .not().isEmpty()
    .isString(),
], valid, adminAuthController.checkToken);

router.post('/logout', [
  check('accessToken')
    .not().isEmpty()
    .isString(),
], valid, adminAuthController.logout);

module.exports = router;
