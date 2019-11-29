const { places } = require('../models/places.model');
const { adminJwtConf } = require('../config/config');
const jwt = require('jsonwebtoken'); 

exports.rejectPlace = async (req, res) => {
   try {
    const { placeId, reason } = req.body;
    const { authorization } = req.headers;

    const { userId } = await jwt.verify(authorization, adminJwtConf.secret);

    await places.findOneAndUpdate({ _id: placeId }, { isModerated: true, approved: false, rejected: true, rejectReason: reason, moderateBy: userId});

    res.status(200).send({ message: 'Its okay' });
   } 
   catch (error) {
       res.status(404).send({ message: "not found" });
   }
}