const mongoose = require('mongoose');

const { Schema } = mongoose;

const wishListSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  userId:{
      type: String,
      required: true,
  },
  placeId:{
      type: String,
      required: true,
  },
  comments:[{ 
      body: String,
      date: Date 
  }],

  todo:{
      type: Boolean,
  },
  inProgress:{
      type: Boolean,
  },
  done:{
      type: Boolean,
  },
  createdAt:{
      type: Date,
      default: Date.now,
  },
  updatedAt:{
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('wishList', wishListSchema);
