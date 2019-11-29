const { Schema, model } = require("mongoose");

const reportsModel = new Schema({
  placeId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  isSolved: {
    type: Boolean,
    required: true
  },
  solvedData: {
    type: Date,
    required: true,
    default: Date.now
  },
  solvedBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = model("reports", reportsModel);
