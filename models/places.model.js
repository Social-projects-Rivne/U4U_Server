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
    required: false,
  },
  photos: {
    type: Array,
    required: false,
  },
  videos: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  reviews: {
    type: Array,
    required: false,
  },
  isModerated: {
    type: Boolean,
    required:true,
  },
  moderateBy: {
    type: String,
    required: false,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
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
 


