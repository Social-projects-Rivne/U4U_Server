const express = require('express');
const { check } = require('express-validator');
const valid = require('../middlewares/express-validation');
const adminAuthController = require('../controllers/admin-auth-controller');

const router = express.Router();

router.post('/login', valid([
  check('email', 'Email is invalid!')
    .not().isEmpty()
    .isEmail()
    .normalizeEmail(),
  check('password', 'Password cannot be empty!')
    .not().isEmpty(),
]), adminAuthController.login);

router.post('/refresh-token', valid([
  check('refreshToken')
    .not().isEmpty()
    .isString(),
]), adminAuthController.refreshToken);

router.post('/check-token', valid([
  check('accessToken')
    .not().isEmpty()
    .isString(),
]), adminAuthController.checkToken);

router.post('/logout', valid([
  check('accessToken')
    .not().isEmpty()
    .isString(),
]), adminAuthController.logout);

module.exports = router;
