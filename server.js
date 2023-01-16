const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const coursesRoute = require("./routes/courses");
const studentsRoute = require("./routes/students");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
//env vars
const uri = process.env.URI;

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/courses", coursesRoute);
app.use("/api/students", studentsRoute);

mongoose.set("strictQuery", false);
mongoose
  .connect(uri)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Started on ${process.env.PORT}`);
      console.log(`MongoDB is connected Successfully!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
