const mongoose = require('mongoose');

const { Schema } = mongoose;

const districtSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  placeID: {
    type: Array,
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

module.exports = mongoose.model('districts', districtSchema);
