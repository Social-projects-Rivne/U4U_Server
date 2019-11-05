const regions = require('../models/region.model');
const districts = require('../models/districts.model');
const {places} = require('../models/places.model');

exports.getAllRegions = (req, res) => {
  regions.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
exports.getAllDistricts = (req, res) => {
  districts.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
exports.getAllPlaces = (req, res) => {
  places.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
