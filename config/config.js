
require('dotenv').config();
const externalApis = require('./externalApis');

module.exports = {
  mongoUrl: `mongodb+srv://${process.env.DB_MONGO_LOGIN}:${process.env.DB_MONGO_PASSWORD}@cluster0-q5xnz.mongodb.net/Ukraine4You?retryWrites=true&w=majority`,
  sql: {
    name: process.env.DB_SQL_NAME,
    password: process.env.DB_SQL_PASSWORD,
    host: process.env.DB_SQL_HOST,
    port: process.env.DB_SQL_PORT,
  },
  jwtConf: {
    secret: 'verySecretString',
    expiresIn: 12000,
    refreshSecret: 'veryRefreshSecret',
    refreshExpiresIn: 36000,
  },
  adminJwtConf: {
    secret: 'adminPanelVerySecretString',
    expiresIn: 12000,
    refreshSecret: 'adminPanelVeryRefreshSecret',
    refreshExpiresIn: 36000,
  },
  externalApis,
};
