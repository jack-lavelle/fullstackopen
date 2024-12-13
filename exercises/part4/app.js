const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

const startDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    logger.info("database already connected");
    return;
  }

  await mongoose.connect(config.MONGODB_URI);
  logger.info("connected to MongoDB with url", config.MONGODB_URI);
};

const closeDatabase = async () => {
  await mongoose.connection.close();
  logger.info("disconnected from MongoDB");
};

if (process.env.NODE_ENV != "test") {
  startDatabase();
}

module.exports = { app, startDatabase, closeDatabase };
