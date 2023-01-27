const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const professorSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

professorSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("all fields must be filled");
  const student = await this.findOne({ email });

  if (!student) throw Error("Incorrect email");

  const match = await bcrypt.compare(password, student.password);

  if (!match) throw Error("Incorrect password");
};

module.exports = mongoose.model("Professor", professorSchema);
