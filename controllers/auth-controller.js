const jwt = require('jsonwebtoken');
const TokenService = require('../services/token-service');
const userModel = require('../models/user.model');
const tokenModel = require('../models/token.model');
const { jwtConf } = require('../config/config');

const tokenService = new TokenService(jwtConf);

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ where: { email, password } });
    if (!user) throw '';

    const tokens = await tokenService.createTokens(user.dataValues.id);

    // send tokens to the client
    res.status(200).json(tokens);
  } catch (err) {
    if (err) throw err;
    res.status(401).json({ err: 'Wrong password or email' });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const tokens = await tokenService.refreshTokens(refreshToken);

    // send tokens to client
    res.status(200).json(tokens);
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
};

exports.checkToken = async (req, res) => {
  const { token } = req.body;
  try {
    jwt.verify(token, jwtConf.secret);
  } catch (err) {
    return res.status(401).json({ err });
  }

  res.status(200).send();
};

exports.logOut = async (req, res) => {
  try {
    await tokenService.logOut(req.body.token);
    res.status(200).send();
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.register = async (req, res) => {
  try {
    const { id } = await userModel.create({ ...req.body, created_at: Date.now() });
    const tokens = await tokenService.createTokens(id);

    res.status(201).json({ message: 'user has been created successful', ...tokens });
  } catch (e) {
    res.status(500).send();
  }
};
