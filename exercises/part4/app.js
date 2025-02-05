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
  if (mongoose.connection.readyState === 1) {
    logger.info("database already connected");
    return;
  }

  await mongoose.connect(config.MONGODB_URI);
  logger.info("connected to MongoDB with url", config.MONGODB_URI);
};

const closeDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    logger.info("database already disconnected");
    return;
  }

  // set timeout to allow for any pending requests to finish
  // otherwise I will get unhandled promise rejections (see the commit)
  setTimeout(async () => {
    await mongoose.connection.close();
    logger.info("disconnected from MongoDB");
  }, 1500);
};

if (process.env.NODE_ENV != "test") {
  startDatabase();
}

module.exports = { app, startDatabase, closeDatabase };
