const TokenService = require('./../services/token-service');
const userModel = require('../models/user.model');
const { jwtConf } = require('../config/config');

const tokenService = new TokenService(jwtConf);

exports.getAllUserData = async (req, res) => {
  try {
    const { token } = req.body;
    const userID = await tokenService.verify(token);

    const getUser = await userModel.findOne({ where: { id: userID } });
    if (!getUser) return res.status(500).send({ message: 'Can`t find user with this id' });
    
    const userData = getUser.dataValues;
    delete userData.password;

    return res.status(200).send(userData);
  } catch (err) {
    return res.status(500).send({ message: 'Wrong user id or token' });
  }
};
