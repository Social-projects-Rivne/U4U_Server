const mongoose = require('mongoose');

const { Schema } = mongoose;

const wishListSchema = new Schema({
  userId:{
      type: String,
      required: true,
  },
  placeId:{
      type: String,
      required: true,
  },
  comment:{ 
      type: String,
  },

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

module.exports = mongoose.model('wishlists', wishListSchema);
