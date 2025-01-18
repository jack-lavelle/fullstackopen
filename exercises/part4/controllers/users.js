const User = require("../models/User");
const usersRouter = require("express").Router();
const { createUserHandler } = require("../utils/users_helper");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  if (!request.params.id) {
    response.status(400).end();
    return;
  }
  const user = await User.findById(request.params.id);
  if (!user) {
    response.status(404).end();
    return;
  }
  response.json(user);
});

usersRouter.post("/", async (request, response) => {
  if (!request.body.username) {
    response.status(400).send({ error: "username is required" });
    return;
  }

  if (!request.body.password) {
    response.status(400).send({ error: "password is required" });
    return;
  }

  const user = await createUserHandler(request.body);

  await user.save();
  response.status(201).json(user);
});

usersRouter.delete("/:id", async (request, response) => {
  if (!request.params.id) {
    response.status(400).end();
    return;
  }

  await User.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = usersRouter;
