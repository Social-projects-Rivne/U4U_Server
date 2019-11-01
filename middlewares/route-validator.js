const { check } = require('express-validator');
const userModel = require('../models/user.model');
const moderatorModel = require('../models/moderator.model');

const empty = 'cannot be empty';
// yyyy-mm-dd
const datePattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const isUnique = (field) => async (value) => {
  const mod = await moderatorModel.findOne({ where: { [field]: value } });
  if (mod) {
    return Promise.reject();
  }
  return Promise.resolve();
};

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
  admin: {
    createModerator: [
      check('nickname')
        .not().isEmpty().withMessage('nickname is required')
        .isString()
        .custom(isUnique('nickname'))
        .withMessage('nickname must be unique'),
      check('name')
        .not().isEmpty()
        .isString(),
      check('surname')
        .not().isEmpty()
        .isString(),
      check('birth_date')
        .not().isEmpty().withMessage('Birth date is required')
        .matches(datePattern)
        .withMessage('Date must be yyyy-mm-dd format'),
      check('email')
        .not().isEmpty().withMessage('E-mail is required')
        .isEmail()
        .withMessage('email bad is bad formatted')
        .custom(isUnique('email'))
        .withMessage('E-mail must be unique'),
      check('password', empty)
        .not().isEmpty()
        .isString(),
      check('avatar', empty)
        .not().isEmpty(),
    ],
  },
};
