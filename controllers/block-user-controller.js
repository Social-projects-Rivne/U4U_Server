const tokenservice = require('../services/token-service');
const { adminJwtConf} = require('../config/config');
const jwt = require('jsonwebtoken'); 
const {userBlocking, userUnblocking} = require ('../models/ban.model');
const users = require ('../models/user.model');


exports.blockUser = async (req, res) => {
    const {authorization} = req.headers;
    const { userId } = jwt.verify(authorization, adminJwtConf.secret);
    await userBlocking(req.body, userId,res);         
};

exports.unblockUser = async (req, res) => {
    try {
        const {authorization} = req.headers;
        const { userId } = jwt.verify(authorization, adminJwtConf.secret);
        await userUnblocking(req.body, userId)
        await res.status(200).send({
            message: 'The user is unblocked'
        });
    }
    catch (e) {
        console.error(e)
        res.status(500).send({ message: e });
    }
};