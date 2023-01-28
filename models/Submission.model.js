const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Assignment = require("./Assignment.model");
const submissionSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    submissionDate: {
      type: Date,
      require: true,
    },
    submittedFile: {
      type: String,
    },
    grade: {
      type: Number,
      min: 0,
      max: 100,
    },
    parentAssignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Assignment,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);