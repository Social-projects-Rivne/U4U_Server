const jwt = require('jsonwebtoken');
const moderatorModel = require('../models/moderator.model');
const adminTokenModel = require('../models/admin-token.model');
const { adminJwtConf } = require('../config/config');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ err: 'Email is required field!' });
    }

    if (!password) {
        return res.status(400).json({ err: 'Password is required field!' });
    }

    try {
        const user = await moderatorModel.findOne({ where: { email, password } });

        const refteshTokenPayload = {
            userId: user.dataValues.id,
            sub: 'refreshToken',
        };

        const accessTokenPayload = {
            userId: user.dataValues.id,
            sub: 'accessToken',
        };

        const refreshToken = jwt.sign(refteshTokenPayload, adminJwtConf.refreshSecret, 
            { expiresIn: adminJwtConf.refreshExpiresIn });
        const accessToken = jwt.sign(accessTokenPayload, adminJwtConf.secret, 
            { expiresIn: adminJwtConf.expiresIn });

        if (await adminTokenModel.findOne({ where: { user_id: user.id } })) {
            await adminTokenModel.update({
                refresh_token: refreshToken,
            }, { where: { user_id: user.dataValues.id } });
        } else {
            await adminTokenModel.create({
                user_id: user.dataValues.id,
                refresh_token: refreshToken,
            });
        }
        
        return res.status(200).json({
            accessToken,
            refreshToken,
        });
    } catch (error) {
        return res.status(401).json({ errors: [{ msg: 'Can`t find user with this email and password.' }] });
    }
};

exports.refreshToken = async (req, res) => {
    const clientRT = req.body.refreshToken;

    try {
        jwt.verify(clientRT, adminJwtConf.refreshSecret);

        const decoded = jwt.decode(clientRT);
        const { userId } = decoded;
        const getServerRT = await adminTokenModel.findOne({ where: { user_id: userId } });
        const serverRT = getServerRT.dataValues.refresh_token;

        if (clientRT === serverRT) {
            const refteshTokenPayload = {
                userId: userId,
                sub: 'refreshToken',
            };
    
            const accessTokenPayload = {
                userId: userId,
                sub: 'accessToken',
            };

            const newRefreshToken = jwt.sign(refteshTokenPayload, adminJwtConf.refreshSecret, 
                { expiresIn: adminJwtConf.refreshExpiresIn });
            const newAccessToken = jwt.sign(accessTokenPayload, adminJwtConf.secret, 
                { expiresIn: adminJwtConf.expiresIn });

            await adminTokenModel.update({
                refresh_token: newRefreshToken,
            }, { where: { user_id: userId } });
        
            return res.status(200).json({
                newAccessToken,
                newRefreshToken,
            });
        } else {
            return res.status(401).json({ errors: [{ msg: 'Invalid refresh token.' }] });
        }
    } catch (error) {
        return res.status(401).json({ errors: [{ param: 'refreshExpiredError', msg: 'Refresh token expired.' }] });
    }
};

exports.checkToken = async (req, res) => {
    const clientRT = req.body.accessToken;

    try {
        jwt.verify(clientRT, adminJwtConf.secret);

        return res.status(200).json({
            status: true,
        });
    } catch (error) {
        return res.status(200).json({
            status: false,
        });
    }
};

exports.logout = async (req, res) => {
    const clientRT = req.body.accessToken;

    try {
        jwt.verify(clientRT, adminJwtConf.secret);

        const decoded = jwt.decode(clientRT);
        const { userId } = decoded;
        const getServerRT = await adminTokenModel.findOne({ where: { user_id: userId } });

        if (getServerRT) {
            await adminTokenModel.destroy({ where: { user_id: userId } });
        }

        return res.status(200).json({
            status: true,
        });
    } catch (error) {
        return res.status(401).json({ errors: [{ param: 'accessExpiredError', msg: 'Access token expired.' }] });
    }
};