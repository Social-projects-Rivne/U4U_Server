const mongoose = require('mongoose');

const { Schema } = mongoose;

const placesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ratingAvg: {
    type: Number,
    required: true,
  },
  photos: {
    type: Array,
    required: true,
  },
  videos: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Array,
    required: true,
  },
  moderateBy: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updateAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('places', placesSchema);
