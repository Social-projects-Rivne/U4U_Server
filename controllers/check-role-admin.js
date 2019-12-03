const { Moderator } = require('../models/moderator.model');
const jwt = require('jsonwebtoken');
const { adminJwtConf } = require('../config/config');

exports.checkRole = async (req, res) => {
    const accessToken = req.header('Authorization');
    if(accessToken){
        try {
            const { userId } = jwt.verify(accessToken, adminJwtConf.secret);
            const user = await Moderator.findOne({where: { id: userId } });
            res.status(200).send({ admin: user.is_admin });
        }
        catch (error) {
            if (error.name === 'TokenExpiredError')
                res.status(401).json({ errors: [{ param: 'accessExpiredError', msg: 'Access token exired.' }] });
            else
                res.status(401).json({ errors: [{ msg: 'Cant verify authorization token.' }] 
            });
        }
    }
    else{
        res.status(401).json({ errors: [{ msg: 'No authorization token, access denied.' }] });
    }
}