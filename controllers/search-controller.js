const places = require('../models/places.model');
const reviews = require('../models/reviews.model');

exports.getSearchData = (req, res) => {
  places
    .find({}, {
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
  reviews
    .aggregate([
      {
        $group: {
          _id: "$placeId",
          stars: { $avg: "$rating" }
        }
      },
      {
        $sort: { stars: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: "places",
          let: {placeId: "$placeId"},
          pipeline: [{
            $match: {placeId: "$$placeId"}
          }],
          as: "placeName"
        }
      },
    ])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
}
