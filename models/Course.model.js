const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const daysEnum = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    days: {
      type: [String],
      enum: daysEnum,
    },
    students: [{ type: String }],
  },
  { timestamps: true }
);

courseSchema.path("days").validate(function (value) {
  return value && value.length > 0;
}, "days cannot be empty");

module.exports = mongoose.model("Course", courseSchema);
