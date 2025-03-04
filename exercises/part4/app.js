import express from "express";
const app = express();

import cors from "cors";

import mongoose from "mongoose";

import config from "./utils/config.js"; // Ensure to include the .js extension if needed
import logger from "./utils/logger.js"; // Ensure to include the .js extension if needed

import middleware from "./utils/middleware.js"; // Ensure to include the .js extension if needed

import blogsRouter from "./controllers/blogs.js"; // Ensure to include the .js extension if needed
import usersRouter from "./controllers/users.js"; // Ensure to include the .js extension if needed
import loginRouter from "./controllers/auth.js"; // Ensure to include the .js extension if needed
// const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", middleware.tokenExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
//app.use(errorHandler);

const startDatabase = async () => {
  await mongoose.connect(config.MONGODB_URI);
  logger.info("connected to MongoDB with url", config.MONGODB_URI);
};

if (process.env.NODE_ENV != "test") {
  startDatabase();
}

export default app;
