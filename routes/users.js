const express = require("express");
const { signupUser, loginUser } = require("../controllers/userController");
const router = express.Router();

//controllers

router.post("/login", loginUser);

module.exports = router;
