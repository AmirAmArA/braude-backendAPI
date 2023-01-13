const express = require("express");
const router = express.Router();
const {
  getStudents,
  getSingleStudent,
  createStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/studentController");

router.get("/", getStudents);

router.get("/:id", getSingleStudent);

router.post("/add-a-student", createStudent);

router.delete("/:id", deleteStudent);

router.patch("/:id", updateStudent);

module.exports = router;
