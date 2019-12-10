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
    required: true,
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
  approved: {
    type: Boolean,
    required: true,
  },
  rejected: {
    type: Boolean,
    required: true,
  },
  rejectReason: {
    type: String,
    required: false,
  },
  createdBy: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  regionId: {
    type: String,
    ref: 'regions',
  },
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'districts',
  },
});

const getPlacesWithLocation = (match, aggregation) => {
  const placesAggregation = [
    {
      $match: match,
    },
    {
      $addFields: {
        regionIdObj: {
          $toObjectId: '$regionId',
        },
      },
    },
    {
      $addFields: {
        regionIdObj: {
          $toObjectId: '$regionId',
        },
      },
    },
    {
      $lookup: {
        from: 'regions',
        localField: 'regionIdObj',
        foreignField: '_id',
        as: 'region',
      },
    },
    {
      $unwind: {
        path: '$region',
      },
    },
    {
      $addFields: {
        districtIdObj: {
          $toObjectId: '$districtId',
        },
      },
    },
    {
      $lookup: {
        from: 'districts',
        localField: 'districtIdObj',
        foreignField: '_id',
        as: 'district',
      },
    },
    {
      $unwind: {
        path: '$district',
      },
    },
    {
      $addFields: {
        location: {
          region: '$region.name',
          district: '$district.name',
        },
      },
    },
    {
      $project: {
        regionIdObj: false,
        districtIdObj: false,
        region: false,
        district: false,
      },
    },
  ];

  if (aggregation && aggregation.length) {
    for (let i = 0; i < aggregation.length; i++) {
      placesAggregation.push(aggregation[i]);
    }
  }

  return places.aggregate(placesAggregation);
};

const getSearchPlace = (search) => {
  return  places.find({name: new RegExp(search, 'i'), isModerated:true}) 
};

const approvePlace = async (id, userId) => {
  await places.findByIdAndUpdate({ _id: id }, { isModerated: true, moderateBy: userId, approved: true,  rejected: false, rejectReason: ""});
}

const addNewPlaceToDb = (newPlace, token,files) =>{
  const {isModerated, regionId, description, title, districtId} = newPlace;
  let photoPathArr = [];
  for(let photoPath of files){
    photoPathArr.push(photoPath.path);
  }
  return  places.create({
    isModerated,
    regionId,
    districtId,
    description,
    photos:photoPathArr,
    createdBy: token,
    name: title,
    approved: false,
    rejected: false,
    rejectReason: ''
  });
}
const places = mongoose.model('places', placesSchema);
module.exports = {
  places,
  getSearchPlace,
  addNewPlaceToDb,
  approvePlace,
  getPlacesWithLocation,
};
