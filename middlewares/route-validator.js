const { check } = require('express-validator');
const userModel = require('../models/user.model');

const empty = 'cannot be empty';

module.exports = {
  //  router file name
  auth: {
    // fro name use path to your route
    login: [
      check('email', 'Email is invalid')
        .not().isEmpty()
        .isEmail()
        .normalizeEmail(),
      check('password', 'Password cannot be empty string')
        .not().isEmpty(),
    ],
    register: [
      check('nickname', `nickname: ${empty}`)
        .not().isEmpty()
        .custom(async (nickname) => {
          const user = await userModel.findOne({ where: { nickname } });
          if (user) {
            return Promise.reject('Nickname already in use');
          }
        }),
      check('name', `name: ${empty}`).not().isEmpty(),
      check('surname', `surname: ${empty}`).not().isEmpty(),
      check('email')
        .not().isEmpty().withMessage(`email: ${empty}`)
        .isEmail()
        .normalizeEmail()
        .custom(async (email) => {
          const user = await userModel.findOne({ where: { email } });
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        }),
      check('password')
        .not().isEmpty()
        .isLength({ min: 4, max: 250 })
        .withMessage('Password must consist at least 4 chars'),
    ],
    refreshToken: [
      check('refreshToken')
        .not().isEmpty()
        .isString(),
    ],
    checkAuth: [
      check('token')
        .not().isEmpty()
        .isString()],
    logOut: [
      check('token').not().isEmpty(),
    ],
  },
};
