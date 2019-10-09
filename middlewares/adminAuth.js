const jwt = require('jsonwebtoken');
const { jwtConf } = require('../config/config');

module.exports = async (req, res, next) => {
  let accessToken = req.header('Authorization');
  if(accessToken)
  {
    try {
      jwt.verify(accessToken, jwtConf.secret);
      next();
    } 
    catch (error) {
      if(error.name === "TokenExpiredError")
        res.status(401).json({ errors: [{param: "accessExpiredError", msg: "Access token exired."}] })
      else
        res.status(401).json({ errors: [{msg: "Cant verify authorization token."}] })
    }
  }
  else
  {
    res.status(401).json({ errors: [{msg: "No authorization token, access denied."}] })
  }
};
