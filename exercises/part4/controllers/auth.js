import express from "express";
import { userLoginHandler } from "../utils/auth_helper.js";

const loginRouter = express.Router();
loginRouter.post("/", async (request, response) => {
  const token = await userLoginHandler(request, response);
  response.status(201).send({ token: token });
});

export default loginRouter;
