const regions = require('../models/region.model');
const districts = require('../models/districts.model');
const tokenservice = require('../services/token-service');
const { jwtConf } = require('../config/config');
const tokenService = new tokenservice(jwtConf);
const { places, addNewPlaceToDb } = require('../models/places.model');


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
exports.postNewPlace = async (req, res) => {
  try {
    const userJwt = req.header('authorization');
    const tokenSplit = userJwt.split(" ");
    const decodedJWT = await tokenService.verify(tokenSplit[1]);
    
    await addNewPlaceToDb(req.body, decodedJWT, req.files);
    await res.status(200).send({
      message: 'Your place is added'
    });
  }
  catch (e) {
    res.status(500).send({ message: e });
  }
}

