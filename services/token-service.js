const jwt = require('jsonwebtoken');
const { jwtConf } = require('../config/config');
const tokenModel = require('../models/token.model');
const userModel = require('../models/user.model');

class TokenService {
  constructor(jwt) {
    this.secret = jwt.secret;
    this.expiresIn = jwt.expiresIn;
    this.refreshSecret = jwt.refreshSecret;
    this.refreshExpiresIn = jwt.refreshExpiresIn;
  }

  createTokens = async (userId) => {
          try {
              const payload = {
                  userId
              };

              // create Tokens
              const accessToken = jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
              const refreshToken = jwt.sign(payload, this.refreshSecret,
                  { expiresIn: this.refreshExpiresIn });

              // If the user has ever logged in, ( update the tokens else create )
              if (await tokenModel.findOne({ where: { user_id: userId } })) {
                  tokenModel.update({
                      access_token: accessToken,
                      refresh_token: refreshToken,
                  }, { where: { user_id: userId } });
              } else {
                  await tokenModel.create({
                      user_id: userId,
                      access_token: accessToken,
                      refresh_token: refreshToken,
                  });
              }

              return { accessToken, refreshToken, expiresIn: this.expiresIn }

          } catch (e) {
              return Promise.reject(e);
          }
  };

  refreshTokens = async (token) => {
    try {
        const { userId } = jwt.verify(token, this.refreshSecret);
        await userModel.findOne({ where: { id: userId } });

        // compare token from client with token in db
        const { dataValues } = await tokenModel.findOne({ where: { user_id: userId } });
        if (token !== dataValues.refresh_token) throw 'refresh token does not match';

        return  await this.createTokens(userId);
    } catch (e) {
        return Promise.reject(e);
    }
  };

  verify = async (token) => {
      try {
          const decode = jwt.verify(token, jwtConf.secret);
          const dbToken = await tokenModel.findOne({ where: { user_id: decode.userId } });
          if (token !== dbToken.dataValues.access_token) throw 'Token dose not match';
          return decode.userId;
      } catch (e) {
          return Promise.reject(e);
      }
  };

  logOut = async (token) => {
      try {
          const { userId } = jwt.verify(token, jwtConf.secret);
          if (!userId) throw 'invalid token';

          await tokenModel.destroy({ where: { user_id: userId } });
      } catch (e) {
          return Promise.reject(e);
      }
  };

}

module.exports = TokenService;
