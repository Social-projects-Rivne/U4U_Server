const jwt = require('jsonwebtoken');
const { jwtConf } = require('../config/config');
const tokenModel = require('../models/token.model');

// auth middleware which checks jwt token
module.exports = async (req, res, next) => {
  let token;
  if (req.header('Authorization')) {
    token = req.header('Authorization').split(' ')[1];
  } else {
    return res.status(401).json({ err: 'No token, authorization denied' });
  }

  try {
    const decode = jwt.verify(token, jwtConf.secret);
    const dbToken = await tokenModel.findOne({ where: { user_id: decode.userId } });
    if (token !== dbToken.dataValues.access_token) throw 'Token dose not match';

    req.userId = decode.userId;
    next();
  } catch (err) {
    res.status(401).json({ err: err.message ? err.message : err });
  }
};
