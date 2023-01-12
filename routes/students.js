const express = require("express");
const Student = require("../models/Student.model");
const router = express.Router();
const {
  getStudent,
  getSingleStudent,
  createStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/courseController");

router.get("/", getStudent);

router.get("/:id", getSingleStudent);

router.post("/add-a-student", createStudent);

router.delete("/:id", deleteStudent);

router.patch("/:id", updateStudent);

module.exports = router;
