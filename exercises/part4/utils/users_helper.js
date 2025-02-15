const bcrypt = require("bcrypt");
const User = require("../models/user");

const createUserHandler = async (body) => {
  const { name, username, password, blogs } = body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return new User({
    name,
    username,
    passwordHash,
    blogs,
  });
};

const validateUser = (username, password) => {
  if (!username || username === "") {
    return "username is required";
  }

  if (!username.length > 3) {
    return "username must be at least 3 characters long";
  }

  if (!password || password === "") {
    return "password is required";
  }

  if (!password.length > 3) {
    return "password must be at least 3 characters long";
  }

  return null;
};

module.exports = { createUserHandler, validateUser };
