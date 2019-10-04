require('dotenv').config();

module.exports = {
  mongoUrl: `mongodb+srv://${process.env.DB_MONGO_LOGIN}:${process.env.DB_MONGO_PASSWORD}@cluster0-q5xnz.mongodb.net/Ukraine4You?retryWrites=true&w=majority`,
  jwtConf: {
    secret: 'verySecretString',
    expiresIn: 12000,
    refreshSecret: 'veryRefreshSecret',
    refreshExpiresIn: 36000,
  },
};
