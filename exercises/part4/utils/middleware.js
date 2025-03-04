import jwt from "jsonwebtoken";
import User from "../models/user.js";

const tokenExtractor = async (request, response, next) => {
  const authorization = request.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({error: "token invalid - missing user ID"});
    }

    const user = await User.findById(decodedToken.id);
    if (user === null) {
      return response.status(401).json({error: "invalid token - token does not correspond to a user"});
    }

    request.user = user;
  } else {
    return response.status(401).json({error: "token missing or invalid"});
  }

  next();
};

export default { tokenExtractor };
