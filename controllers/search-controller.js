const { places, getPlacesWithLocation } = require('../models/places.model');

exports.getSearchData = (req, res) => {
  places
    .find({ name: { $regex: `\\b${req.query.q}`, "$options": "i" } }, {
      _id: 1,
      name: 1,
      regionId: 1,
      districtId: 1,
    })
    .populate('regionId', {
      _id: 0,
      name: 1,
    })
    .populate('districtId', {
      _id: 0,
      name: 1,
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};

exports.getSearchStar = (req, res) => {
  getPlacesWithLocation({}, [
    {
      $match: {
        approved: true,
        isModerated: true,
        rejected: false,
      },
    },
    {
      $sort: { ratingAvg: -1 },
    },
    {
      $limit: 8,
    },
    {
      $project: {
        _id: 1,
        ratingAvg: 1,
        name: 1,
        photos: 1,
        isModerated: 1,
        approved: 1,
        location: 1,
      },
    },
  ])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};

exports.getRandomPlace = (req, res) => {
  places
    .aggregate([
      {
        $match: {
          approved: true,
          isModerated: true,
          rejected: false,
        },
      },
      {
        $sample: { size: 1 },
      },
      {
        $project: {
          _id: '$_id',
          isModerated: 1,
          approved: 1,
        },
      },
    ])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};