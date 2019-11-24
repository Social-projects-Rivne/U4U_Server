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
  isModerated: {
    type: Boolean,
    required: true
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
    type: Number,
    required: false,
  },
  isModerated: {
    type: Boolean,
    required:true,
  },
  approved: {
    type: Boolean,
    required: true
  },
  rejected: {
    type: Boolean,
    required: true
  },
  rejectReason: {
    type: String,
    required: false
  },
  createdBy: {
    type: Number,
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
    type: String,
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

const approvePlace = async (id, userId) => {
  await places.findByIdAndUpdate({ _id: id }, { isModerated: true, moderateBy: userId, approved: true,  rejected: false, rejectReason: ""});
}

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
  addNewPlaceToDb,
  approvePlace
}
 


