const { places } = require('../models/places.model');

exports.getApprovePlaces = async (req, res) => {
    try {
        const allPlaces = await places.find({});
        const notApprovePlaces = await allPlaces.filter((place) => {
            return place.isModerated === false
        })
        res.status(200).send(notApprovePlaces);    
    } 
    catch (error) {
        res.status(404).send({ message: 'Not found' });  
    }
};

exports.approvePlace = async (req, res) => {
    try {
        const { idOfPlace } = req.body;
        await places.findByIdAndUpdate({ _id: idOfPlace }, { isModerated: true });
        res.send({ message: 'It was success' });
    } catch (error) {
        throw new Error(err);
    }
}