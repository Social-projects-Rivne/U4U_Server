exports.getAllRegions = (req, res) => {
    const regions = require('../models_mongo/region.model');
    regions.find({})
    .then((regions) => {
        res.status(200).send(regions);
    })
    .catch((err) => {
        // handle error
    })
};
exports.getAllDistricts = (req, res) => {
    const districts = require('../models_mongo/districts.model');
    districts.find({})
    .then((districts) => {
        res.status(200).send(districts);
    })
    .catch((err) => {
        // handle error
    })
}
exports.getAllPlaces = (req, res) => {
    const places = require('../models_mongo/places.model');
    places.find({})
    .then((places) => {
        res.status(200).send(places);
    })
    .catch((err) => {
        // handle Error
    })
}