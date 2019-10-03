const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.sqlDataBase, 'postgres', process.env.sqlPassword, {
  dialect: 'postgres',
  host: process.env.host,
  port: process.env.sqlPort,
  logging: false,
});
sequelize.authenticate()
  .then(() => {
    console.log('Postgre Connected');
  })
  .catch((err) => {
    throw new Error('Error SQL connection', err);
  });

module.exports = sequelize;
