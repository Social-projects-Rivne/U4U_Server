const Sequelize = require('sequelize');

const db = new Sequelize(process.env.sqlDataBase, 'postgres', process.env.sqlPassword, {
  dialect: 'postgres',
  host: process.env.host,
  port: process.env.sqlPort,
  logging: false,
});

db.authenticate()
  .then(() => {
    console.log('SQL Connected');
  })
  .catch((err) => {
    throw new Error('Error SQL connection', err);
  });

module.exports = db;
