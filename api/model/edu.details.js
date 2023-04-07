const mongoose = require("mongoose");

const educationSchema = mongoose.Schema({
  institute: {
    type: String,
    required: true,
  },
  period: {
    type: String,
  },
  additional: {
    type: String,
  },
});

const eduDetailsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  userId: {
    type: String,
    required: true,
  },
  details: {
    type: [educationSchema],
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("EduDetails", eduDetailsSchema);