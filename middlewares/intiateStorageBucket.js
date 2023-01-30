const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const uri = process.env.URI;

const conn = mongoose.connection;
let gfs;

gfs = Grid(conn.db, mongoose.mongo);
conn.db.listCollections({ name: "your-bucket-name" }).next((err, collinfo) => {
  if (!collinfo) {
    gfs.createBucket({ bucketName: "your-bucket-name" });
  }
});
