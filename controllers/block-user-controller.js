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
        await userUnblocking(req.body,res)
};