const express = require("express");
const router = express.Router();

const {
  createSubmission,
  getSubmissions,
  getSingleSubmission,
  deleteSubmission,
  updateSubmission,
} = require("../controllers/submissionController");

router.get("/", getSubmissions);

router.get("/:id", getSingleSubmission);

router.post("/add-a-assignment", createSubmission);

router.delete("/:id", deleteSubmission);

router.patch("/:id", updateSubmission);

module.exports = router;
