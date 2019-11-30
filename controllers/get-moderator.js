const moderators = require('../models/moderator.model');
const { adminJwtConf } = require('../config/config');
const jwt = require('jsonwebtoken');

exports.getModerator = async (req, res) => {
    try {
        const accessToken = req.header('Authorization');
        const { userId } = await jwt.verify(accessToken, adminJwtConf.secret);
        const moderator = await moderators.findAll({where: {id: userId}});
        const { nickname, avatar } = moderator[0].dataValues;
        res.status(200).send({ nickname: nickname, avatar: avatar });
    } catch (error) {
        res.status(404).send({ error: 'Not found' + error })
    }
};
