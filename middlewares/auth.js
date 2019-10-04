const jwt = require('jsonwebtoken');
const { jwtConf } = require('../config/config');

// auth middleware which checks jwt token
module.exports = (req, res, next) => {
  let token;
  if (req.header('Authorization')) {
    token = req.header('Authorization').split(' ')[1];
  } else {
    return res.status(401).json({ err: 'No token, authorization denied' });
  }

  try {
    const decode = jwt.verify(token, jwtConf.secret);
    req.userId = decode.userId;
    next();
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
};
