const Sequelize = require('sequelize');
const sequelize = require('../config/postgre');

const Business = sequelize.define('business', {
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
},
  {
  timestamps: false,
});

/**
 * Relation Bans -> Users
 */

Business.associate = function(models){
  Business.belongsTo(models.User)
};

module.exports = Business;
