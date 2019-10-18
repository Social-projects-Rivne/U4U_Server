const jwt = require('jsonwebtoken');
const { jwtConf } = require('../config/config');

module.exports = decodeJwt = async (token) => {
  try {
    const { userId } = await jwt.verify(token, jwtConf.secret);
    return userId;
  } 
  catch (error) {
    return error;
  }
};
