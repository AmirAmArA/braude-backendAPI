const express = require("express");
const router = express.Router();
const {
  createCourse,
  getSingleCourse,
  getCourses,
  deleteCourse,
  updateCourse,
} = require("../controllers/courseController");
const requireAuth = require("../middlewares/requireAuth");

router.use(requireAuth);

router.get("/", getCourses);

router.get("/:id", getSingleCourse);

router.post("/add-a-course", createCourse);

router.delete("/:id", deleteCourse);

router.patch("/:id", updateCourse);

module.exports = router;
