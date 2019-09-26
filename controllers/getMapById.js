exports.getRegionById = (req, res) => {
    const id = req.params.id;
    const regions = require('../models_mongo/region.model');
    regions.findById(id)
    .then((region) => {
        res.status(200).send(region);
    })
    .catch((err) => {
        res.status(404).send({message: 'Not Found'});
    })
};
exports.getDistrictById = (req, res) => {
    const id = req.params.id;
    const district = require('../models_mongo/districts.model');
    district.findById(id)
    .then((district) => {
        res.status(200).send(district);
    })
    .catch((err) => {
        res.status(404).send({message: 'Not Found'});
    })
};
exports.getPlaceById = (req, res) => {
    const id = req.params.id;
    const place = require('../models_mongo/places.model');
    place.findById(id)
    .then((place) => {
        res.status(200).send(place);
    })
    .catch((err) => {
        res.status(404).send({message: 'Not Found'});
    })
};