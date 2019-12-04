const mongoose = require('mongoose');
const regions = require('../models/region.model');
const district = require('../models/districts.model');

const { places, getPlacesWithLocation } = require('../models/places.model');


exports.getRegionById = (req, res) => {
  const { RegionId } = req.params;
  regions.findById(RegionId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
exports.getDistrictById = (req, res) => {
  const { DistrictId } = req.params;
  district.findById(DistrictId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
exports.getPlaceById = (req, res) => {
  const { PlaceId } = req.params;
  getPlacesWithLocation({ _id: mongoose.Types.ObjectId(PlaceId) })
    .then((data) => {
      res.status(200).send(data[0]);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
exports.getAllDistrictsByIdRegion = (req, res) => {
  const { RegionId } = req.params;
  district.find({ regionId: RegionId })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
exports.getRegionByIdAndDistrictById = (req, res) => {
  const { DistrictId, RegionId } = req.params;
  district.find({ _id: DistrictId, regionId: RegionId })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
exports.getRegionByIdAndDistrictByIdPlaces = (req, res) => {
  const { RegionId, DistrictId } = req.params;
  places.find({ regionId: RegionId, districtId: DistrictId })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
exports.getRegionByIdDistrictByIdPlaceById = (req, res) => {
  const { RegionId, DistrictId, PlaceId } = req.params;
  places.find({ _id: PlaceId, districtId: DistrictId, regionId: RegionId })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
exports.getAllPlacesByRegionId = (req, res) => {
  const { RegionId } = req.params;
  getPlacesWithLocation({ regionId: RegionId })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
