import express from "express";
import { userLoginHandler } from "../utils/auth_helper.js";

const loginRouter = express.Router();
loginRouter.post("/", async (request, response) => {
  const userDetails = await userLoginHandler(request, response);
  response
    .status(201)
    .send({ token: userDetails.token, user: userDetails.user });
});

export default loginRouter;
