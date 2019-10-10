
const Sequelize = require('sequelize');
const sequelize = require('../config/postgre');

const Token = sequelize.define('admin_tokens', {
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
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  refresh_token: {
    type: Sequelize.STRING,
  },
}, {
  timestamps: false,
});

/**
 * Relation Tokens -> Users
 */

Token.associate = (models) => {
  Token.belongsTo(models.User);
};

module.exports = Token;
