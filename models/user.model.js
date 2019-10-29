const Sequelize = require('sequelize');
const sequelize = require('../config/postgre');
const Ban = require('./ban.model.js');
const Business = require('./business.model.js');
const Token = require('./token.model.js');

const Ban = require('../models/ban.model');
const Business = require('../models/business.model');
const Token = require('../models/token.model');

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: Sequelize.STRING,
  },
  surname: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  avatar: {
    type: Sequelize.STRING,
  },
  is_business: {
    type: Sequelize.BOOLEAN,
  },
  birth_date: {
    type: Sequelize.DATEONLY,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  updated_at: {
    type: Sequelize.DATE,
  },
}, {
  timestamps: false,
});

/**
 * Relation Users -> Bans
 */

User.hasOne(Ban, {foreignKey: 'user_id'});


/**
 * Relation Users -> Business
 */

User.hasOne(Business, {foreignKey: 'user_id'});

/**
 * Relation Users -> Tokens
 */

User.hasOne(Token, {foreignKey: 'user_id'});

module.exports = User;
