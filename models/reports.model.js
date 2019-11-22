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
  reviewId: {
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
    required: true
  },
  solvedBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});

module.exports = model("reports", reportsModel);
