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
    required: true,
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
  moderateBy: {
    type: String,
    required: false,
  },
  isModerated: {
    type: Boolean,
    required:true,
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

const addNewPlaceToDb = (newPlace, token,files) =>{
  const {isModerated, regionId, description, title} = newPlace;
  let photoPathArr = [];
  for(let photoPath of files){
    photoPathArr.push(photoPath.path);
  }
  return  places.create({
    isModerated,
    regionId,
    description,
    photos:photoPathArr,
    createdBy: token,
    name: title
  });
}
const places = mongoose.model('places', placesSchema);
module.exports = {
  places,
  getSearchPlace,
  addNewPlaceToDb
}
 


