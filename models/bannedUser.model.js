const Sequelize = require('sequelize');
const sequelize = require('../config/postgre');

const BannedUser = sequelize.define('banned_users', {
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
  banned_by: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ban_start: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ban_end: {
    type: Sequelize.DATE,
  },
  reason: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  timestamps: false,
});


// BannedUser.findAll({row:true})
//   .then((bUsers) => {
//     console.log(bUsers);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
