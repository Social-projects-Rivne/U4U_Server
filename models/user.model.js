const Sequelize = require('sequelize');
const sequelize = require('../config/postgre');

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

User.associate = function(models){
  User.hasOne(models.Ban)
};

/**
 * Relation Users -> Business
 */

User.associate = function(models){
  User.hasOne(models.Business)
};

/**
 * Relation Users -> Tokens
 */

User.associate = function(models){
  User.hasOne(models.Token)
};
