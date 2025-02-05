const User = require("../models/user");
const usersRouter = require("express").Router();
const { createUserHandler, validateUser } = require("../utils/users_helper");

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
  const error = validateUser(request.body.username, request.body.password);
  if (error) {
    response.status(400).json({ error });
    return;
  }

  User.find({ username: request.body.username }).then((users) => {
    if (users.length > 0) {
      return { error: "username must be unique" };
    }
  });

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
