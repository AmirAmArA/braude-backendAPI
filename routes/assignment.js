const express = require("express");
const router = express.Router();

const {
  createAssignment,
  getAssignments,
  getSingleAssignment,
  deleteAssignment,
  updateAssignment,
} = require("../controllers/assignmentController");

router.get("/", getAssignments);

router.get("/:id", getSingleAssignment);

router.post("/add-a-assignment", createAssignment);

router.delete("/:id", deleteAssignment);

router.patch("/:id", updateAssignment);

module.exports = router;
