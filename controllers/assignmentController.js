const Assignment = require("../models/Assignment.model");
const mongoose = require("mongoose");

//get all assignment
const getAssignments = async (req, res) => {
  const assignemnts = await Assignment.find({}).sort({ createdAt: -1 });
  res.status(200).json(assignemnts);
};

//get a single assignment
const getSingleAssignment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No Such Valid ID" });

  const assignemnt = await Assignment.findById(id);
  if (!assignemnt)
    return res.status(404).json({ error: "No Such Valid Assignment" });
  res.status(200).json(assignemnt);
};

// create a new assignment
const createAssignment = async (req, res) => {
  const { name, deadLine, course, assignemntStatus, file } = req.body;
  try {
    const assignemnt = await Assignment.create({
      name,
      deadLine,
      course,
      assignemntStatus,
      file,
    });
    res.status(200).json(assignemnt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete an assignment
const deleteAssignment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No Such Valid Assignment" });

  const assignment = await Assignment.findOneAndDelete({ _id: id });
  if (!assignment) return res.status(400).json({ error: "No Such Assignment" });
  res.status(200).json(assignment);
};

//update an assignemnt
const updateAssignment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No Such Valid Assignment" });

  const assignment = await Assignment.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!assignment)
    return res.status(400).json({ error: "No Such Valid Assignment" });
  res.status(200).json(assignment);
};

module.exports = {
  createAssignment,
  getAssignments,
  getSingleAssignment,
  deleteAssignment,
  updateAssignment,
};
