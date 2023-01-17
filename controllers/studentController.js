const Student = require("../models/Student.model");
const mongoose = require("mongoose");

//get all courses
const getStudents = async (req, res) => {
  const students = await Student.find({}).sort({ createdAt: -1 });
  res.status(200).json(students);
};

//get a single student
const getSingleStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such valid id" });

  const student = await Student.findById(id);
  if (!student) return res.status(404).json({ error: " no such student" });
  res.status(200).json(student);
};

//create a new student
const createStudent = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const student = await Student.create({ name, email, password });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//delete a student
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such valid student" });

  const student = await StudentModel.findOneAndDelete({ _id: id });
  if (!student) return res.status(400).json({ error: "no such student" });
  res.status(200).json(student);
};

//update a student
const updateStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such student" });

  const student = await Student.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!student) return res.status(400).json({ error: "no such student" });
  res.status(200).json(student);
};

module.exports = {
  getStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
  createStudent,
};
