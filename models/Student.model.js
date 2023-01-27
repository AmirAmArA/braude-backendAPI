const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const validator = require("validator");

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
  },
  { timestamps: true }
);

studentSchema.statics.signup = async function (name, email, password) {
  if (!name || !email || !password) throw Error("all fields must be filled");
  if (!validator.isEmail(email)) throw Error("use a valid email");
  if (!validator.isStrongPassword(password)) throw Error("password not strong");

  const exist = await this.findOne({ email });

  if (exist) throw Error("Email already in use");
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hashedPassword = await bcrypt.hash(password, salt);

  const student = await this.create({ email, name, password: hashedPassword });
  return student;
};

studentSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("all fields must be filled");
  const student = await this.findOne({ email });

  if (!student) throw Error("Incorrect email");

  const match = await bcrypt.compare(password, student.password);

  if (!match) throw Error("Incorrect password");
  return student;
};

module.exports = mongoose.model("Student", studentSchema);
