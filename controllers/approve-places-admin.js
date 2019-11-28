const { places, approvePlace } = require('../models/places.model');
const sequelize = require('../config/postgre');
const { adminJwtConf } = require('../config/config');
const jwt = require('jsonwebtoken'); 

exports.getApprovePlaces = async (req, res) => {
    try {

        const allPlaces = await places.find({ isModerated: false});

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

exports.getApprovedPlaces = async (req, res) => {
    try {

        const approvedPlaces = await places.find({ isModerated: true, approved: true });

        const idOfUsers = approvedPlaces.map((place) => {
            return place.createdBy;
        })

        const idOfModerators = approvedPlaces.map((place) => {
            return place.moderateBy;
        })

        const users = await sequelize.query('SELECT email, id FROM users WHERE id IN ' + '(' + idOfUsers + ')');
        const modetarors = await sequelize.query('SELECT email, id FROM moderators WHERE id IN ' + '(' + idOfModerators + ')');

        const result = [];

        approvedPlaces.map((placeItem) => {
            users[0].find((user) => {
                modetarors[0].find((moderator) => {
                    if(placeItem.createdBy === user.id && placeItem.moderateBy === moderator.id){
                        result.push({ userEmail: user.email, description: placeItem.description, name: placeItem.name, id: placeItem._id, createdAt: placeItem.createdAt, moderateBy: moderator.email })
                    }
                })
            })
        })

        res.status(200).send(result);    
    } 
    catch (error) {
        res.status(404).send({ message: 'Not found' });  
    }
}

exports.getRejectedPlaces = async (req, res) => {
    try {

        const rejectedPlaces = await places.find({ isModerated: true, rejected: true });

        const idOfUsers = rejectedPlaces.map((place) => {
            return place.createdBy;
        })

        const idOfModerators = rejectedPlaces.map((place) => {
            return place.moderateBy;
        })

        const users = await sequelize.query('SELECT email, id FROM users WHERE id IN ' + '(' + idOfUsers + ')');
        const modetarors = await sequelize.query('SELECT email, id FROM moderators WHERE id IN ' + '(' + idOfModerators + ')');

        const result = [];

        rejectedPlaces.map((placeItem) => {
            users[0].find((user) => {
                modetarors[0].find((moderator) => {
                    if(placeItem.createdBy === user.id && placeItem.moderateBy === moderator.id){
                        result.push({ userEmail: user.email, description: placeItem.description, name: placeItem.name, id: placeItem._id, rejectReason: placeItem.rejectReason, moderateBy: moderator.email })
                    }
                })
            })
        })

        res.status(200).send(result);    
    } 
    catch (error) {
        res.status(404).send({ message: 'Not found' });  
    }
}

exports.approvePlace = async (req, res) => {
    try {
        const { id } = await req.body;
        const { authorization } = req.headers;
        const { userId } = jwt.verify(authorization, adminJwtConf.secret);

        await approvePlace(id, userId);
        
        res.send({ message: 'It was success' });
    } catch (error) {
        throw new Error(error);
    }
}