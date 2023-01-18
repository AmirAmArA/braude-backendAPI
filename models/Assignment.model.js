const mongoose = require("mongoose");
const Course = require("./Course.model");
const Schema = mongoose.Schema;
const assignmentStatus = ["Active", "Canceled", "Finished", "OnHold"];
const assignmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  deadLine: {
    type: Date,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Course,
  },
  assignmentStatus: {
    type: String,
    enum: assignmentStatus,
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
