const reviewsModel = require('../models/reviews.model');
const { places } = require('../models/places.model');
const sequelize = require('../config/postgre');

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewsModel.find({});

        const idOfUsers = reviews.map((item) => {
            return item.createdBy;
        });

        const UserEmails = await sequelize.query('SELECT id, email FROM users WHERE id IN ' + '(' + idOfUsers + ')');

        const Places = await places.find({});

        // I am sorry for this code :( BUT IT WORKS!

        const result = [];
        reviews.map((reviewElem) => {
            UserEmails[0].find((userEmail) => {
                Places.find((place) => {
                    if(userEmail.id === reviewElem.createdBy && place._id == reviewElem.placeId){
                        result.push({...reviewElem._doc, emailUser: userEmail.email, placeName: place.name});
                    }
                })
            })
        })

        res.send(result);
    }  
    catch (error) {
       throw new Error(error); 
    }
};