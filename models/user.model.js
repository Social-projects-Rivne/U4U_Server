const Sequelize = require('sequelize'); // data types
const sequelize = require('../config/postgre'); // data base

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, { timestamps: false });

User.findAll({ raw: true })
  .then((users) => {
    console.log(users);
  })
  .catch((err) => {
    console.log(err);
  });
