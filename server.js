const express = require("express");
const mongoose = require("mongoose");


//edit by haya
const cors = require('cors')
const app = express()
app.use(cors())
//

const coursesRoute = require("./routes/courses");
const studentsRoute = require("./routes/students");
require("dotenv").config();

const app = express();
//env vars
const uri = process.env.URI;

//middlewares
app.use(express.json());

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
