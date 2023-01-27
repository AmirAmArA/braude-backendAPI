const jwt = require("jsonwebtoken");
const Student = require("../models/Student.model");
const Professor = require("../models/Professor.model");

const requireAuth = async (req, res, next) => {
  //verify Auth
  const { authorization } = req.headers;
  const { role } = req.body;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    switch (role) {
      case "PROFESSOR":
        req.user = await Professor.findOne({ _id }).select("_id");
        break;
      case "STUDENT":
        req.user = await Student.findOne({ _id }).select("_id");
        break;
      default:
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not Authorized" });
  }
};

module.exports = requireAuth;
