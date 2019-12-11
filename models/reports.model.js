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

const reportModel = model("reports", reportsModel);

const getAllReports = async () => {
  return await reportModel.find({});
}

module.exports = {
  reportModel,
  getAllReports
}
