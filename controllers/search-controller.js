const {places} = require('../models/places.model');

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
  places
    .aggregate([
      {
        $sort: { ratingAvg: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 1,
          ratingAvg: 1,
          name: 1,
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
        $sample: { size: 1 }
      },
      {
        $project: {
          _id: 0,
          id: '$_id'
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