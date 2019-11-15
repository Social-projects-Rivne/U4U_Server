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
  isModerated: {
    type: Boolean,
    required: true
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
    type: Number,
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
  regionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "regions"
  },
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "districts"
  },
});

const getSearchPlace = (search) => {
  return  places.find({name: new RegExp(search, 'i')}) 
};
const places = mongoose.model('places', placesSchema);
module.exports = {
  places,
  getSearchPlace
}
 


