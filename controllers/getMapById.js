exports.getRegionById = (req, res) => {
    const id = req.params.id;
    const regions = require('../models_mongo/region.model');
    regions.findById(id)
    .then((region) => {
        res.status(200).send(region);
    })
    .catch(() => {
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
    .catch(() => {
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
    .catch(() => {
        res.status(404).send({message: 'Not Found'});
    })
};
exports.getAllDistrictsByIdRegion = (req, res) => {
    const id = req.params.id;
    const districts = require('../models_mongo/districts.model');
    districts.find({regionId: id})
    .then((districts) => {
        res.status(200).send(districts);
    })
    .catch(() => {
        res.status(404).send({message: 'Not Found'});
    })
}
exports.getRegionByIdAndDistrictById = (req, res) => {
  const id = req.params.id;
  const id2 = req.params.id2;
  const districts = require('../models_mongo/districts.model');

    districts.find({_id: id2, regionId: id})
    .then((district) => {
        res.status(200).send(district);
    })
    .catch(() => {
        res.status(404).send({message: 'Not Found'});
    })
};
exports.getRegionByIdAndDistrictByIdPlaces = (req, res) => {
  const id = req.params.id;
  const id2 = req.params.id2;

  const places = require('../models_mongo/places.model');

    places.find({regionId: id, districtId: id2})
    .then((places) => {
        res.status(200).send(places);
    })
    .catch(() => {
        res.status(404).send({message: 'Not Found'});
    })
};
exports.getRegionByIdDistrictByIdPlaceById = (req, res) => {
  const id = req.params.id;
  const id2 = req.params.id2;
  const id3 = req.params.id3;

  const places = require('../models_mongo/places.model');

    places.find({_id: id3, districtId: id2, regionId: id})
    .then((place) => {
        res.status(200).send(place);
    })
    .catch(() => {
        res.status(404).send({message: 'Not Found'});
    })
}
