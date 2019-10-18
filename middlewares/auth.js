const { jwtConf } = require('../config/config');
const TokenService = require('../services/token-service');
const tokenService = new TokenService(jwtConf);

// auth middleware which checks jwt token
module.exports = async (req, res, next) => {
  let token;
  if (req.header('Authorization')) {
    token = req.header('Authorization').split(' ')[1];
  } else {
    return res.status(401).json({ err: 'No token, authorization denied' });
  }

  try {
    req.userId = await tokenService.verify(token);
    next();
  } catch (err) {
    res.status(401).json({ err: err.message ? err.message : err });
  }
};
