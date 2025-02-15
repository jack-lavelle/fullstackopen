const config = require("../utils/config");
const logger = require("../utils/logger");
const mongoose = require("mongoose");

const blog1 = {
  title: "title1",
  author: "author1",
  url: "url1.com",
  likes: 5,
};
const blog2 = {
  title: "title1",
  author: "author1",
  url: "url1.com",
  likes: 6,
};
const blog3 = {
  title: "title1",
  author: "author2",
  url: "url1.com",
  likes: 6,
};
const blog4 = {
  title: "title1",
  author: "author3",
  url: "url1.com",
  likes: 13,
};

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

module.exports = { blog1, blog2, blog3, blog4, startDatabase, closeDatabase };
