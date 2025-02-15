const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
// const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
//app.use(errorHandler);

const startDatabase = async () => {
  await mongoose.connect(config.MONGODB_URI);
  logger.info("connected to MongoDB with url", config.MONGODB_URI);
};

if (process.env.NODE_ENV != "test") {
  startDatabase();
}

module.exports = app;
