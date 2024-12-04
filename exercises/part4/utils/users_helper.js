const bcrypt = require("bcrypt");
const User = require("../models/User");

const createUserHandler = async (body) => {
  const { name, username, password } = body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return new User({
    name,
    username,
    passwordHash,
  });
};

module.exports = { createUserHandler };
