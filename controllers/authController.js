const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const tokenModel = require('../models/token.model');
const { jwtConf } = require('../config/config');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { dataValues: user } = await userModel.findOne({ where: { email, password } });

    const payload = {
      userId: user.id,
    };

    // create Tokens
    const accessToken = jwt.sign(payload, jwtConf.secret, { expiresIn: jwtConf.expiresIn });
    const refreshToken = jwt.sign(payload, jwtConf.refreshSecret,
      { expiresIn: jwtConf.refreshExpiresIn });

    // If the user has ever logged in, ( update the tokens else create )
    if (await tokenModel.findOne({ where: { user_id: user.id } })) {
      tokenModel.update({
        access_token: accessToken,
        refresh_token: refreshToken,
      }, { where: { user_id: user.id } });
    } else {
      await tokenModel.create({
        user_id: user.id,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }

    // send tokens to the client
    res.status(200).json({
      accessToken,
      refreshToken,
      expiresIn: jwtConf.expiresIn,
    });
  } catch (err) {
    if (err) throw err;
    res.status(401).json({ err: 'Wrong password or email' });
  }
};

exports.refreshToken = async (req, res) => {
  if (!req.body.refreshToken) {
    return res.status(404).json({ err: 'No refresh token' });
  }
  const { refreshToken } = req.body;

  try {
    const { userId } = jwt.verify(refreshToken, jwtConf.refreshSecret);
    await userModel.findOne({ where: { id: userId } });

    const payload = {
      userId,
    };

    // compare token from client with token in db
    const { dataValues } = await tokenModel.findOne({ where: { user_id: userId } });
    if (refreshToken !== dataValues.refresh_token) throw 'refresh token does not match';

    // create new tokens
    const accessToken = jwt.sign(payload, jwtConf.secret, { expiresIn: jwtConf.expiresIn });
    const newRefreshToken = jwt.sign(payload, jwtConf.refreshSecret,
      { expiresIn: jwtConf.refreshExpiresIn });

    // refresh old tokens
    await tokenModel.update({
      access_token: accessToken,
      refresh_token: newRefreshToken,
    }, { where: { user_id: userId } });

    // send tokens to client
    res.status(200).json({
      accessToken,
      refreshToke: newRefreshToken,
      expiresIn: jwtConf.expiresIn,
    });
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
};
