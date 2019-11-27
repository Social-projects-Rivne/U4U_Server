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
    console.log(userData);
    delete userData.password;

    return res.status(200).send(userData);
  } catch (err) {
    return res.status(500).send({ message: 'Wrong user id or token' });
  }
};

exports.editUserData = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userID = await tokenService.verify(token);

    const user = await userModel.findOne({ where: { id: userID } });
    if (!user) return res.status(500).send({ message: 'Can`t find user with this id' });

    const { name, surname, nickname, email } = req.body;
    // for security reason -> don't load strange fields
    const fromBody = { name, surname, nickname, email };

    const toUpdate = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(fromBody)) {
      if (value) {
        toUpdate[key] = value;
      }
    }
    const result = await user.update(toUpdate);
    res.status(200).send(result.dataValues);
  } catch (err) {
    res.status(500).send({ message: 'Illegal data passed' });
  }
};
