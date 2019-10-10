const jwt = require('jsonwebtoken');
const { adminJwtConf } = require('../config/config');

module.exports = async (req, res, next) => {
  const accessToken = req.header('Authorization');
  if (accessToken) {
    try {
      jwt.verify(accessToken, adminJwtConf.secret);
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError')
        res.status(401).json({ errors: [{ param: 'accessExpiredError', msg: 'Access token exired.' }] });
      else
        res.status(401).json({ errors: [{ msg: 'Cant verify authorization token.' }] });
    }
  } else {
    res.status(401).json({ errors: [{ msg: 'No authorization token, access denied.' }] });
  }
};
