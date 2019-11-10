const reviewsModel = require('../models/reviews.model');
const sequelize = require('../config/postgre');
const users = require('../models/user.model');

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewsModel.find({});

        const idOfUsers = reviews.map((item) => {
            return item.createdBy;
        });

        const UserEmails = await sequelize.query('SELECT id, email FROM users WHERE id IN ' + '(' + idOfUsers + ')');

        
        res.send(actualReviews);
        
    } 
    catch (error) {
       throw new Error(error); 
    }
};