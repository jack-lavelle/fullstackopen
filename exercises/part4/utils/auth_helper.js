import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// returns the user
export const getAuthorizedUserFromRequest = async (request) => {
  const authorization = request.get("Authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.replace("Bearer ", "");
    if (!token) {
      return null;
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      throw new Error("token missing or invalid");
    }
    return User.findById(decodedToken.id);
  }

  return null;
};

// returns a token if the user is authenticated
export const userLoginHandler = async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });

  if (!user) {
    return response.status(401).json({ error: "could not find user" });
  }
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) {
    return response.status(401).json({ error: "invalid password" });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  return jwt.sign(userForToken, process.env.SECRET);
};
