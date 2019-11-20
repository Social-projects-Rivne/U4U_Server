const { places } = require('../models/places.model');
const sequelize = require('../config/postgre');
const { adminJwtConf } = require('../config/config');
const jwt = require('jsonwebtoken'); 

exports.getApprovePlaces = async (req, res) => {
    try {

        const allPlaces = await places.find({ isModerated: false });

        const idOfUsers = allPlaces.map((place) => {
            return place.createdBy;
        })

        const users = await sequelize.query('SELECT email, id FROM users WHERE id IN ' + '(' + idOfUsers + ')');

        const result = [];

        allPlaces.map((placeItem) => {
            users[0].find((user) => {
                if(placeItem.createdBy === user.id){
                    result.push({ userEmail: user.email, description: placeItem.description, name: placeItem.name, id: placeItem._id, createdAt: placeItem.createdAt })
                }
            })
        })

        res.status(200).send(result);    
    } 
    catch (error) {
        res.status(404).send({ message: 'Not found' });  
    }
};

exports.approvePlace = async (req, res) => {
    try {
        const { id } = await req.body;
        const { authorization } = req.headers;
        const { userId } = jwt.verify(authorization, adminJwtConf.secret);

        await places.findByIdAndUpdate({ _id: id }, { isModerated: true, moderateBy: userId });
        res.send({ message: 'It was success' });
    } catch (error) {
        throw new Error(error);
    }
}