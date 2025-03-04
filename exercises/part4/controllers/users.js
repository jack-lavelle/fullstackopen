import router from "express";
import User from "../models/user.js";
import userHelper from "../utils/users_helper.js";
const { createUserHandler, validateUser } = userHelper;

const usersRouter = router.Router();
usersRouter.get("/", async (_, response) => {
  const users = await User.find({}).populate("blogs");
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
  try {
    const error = validateUser(request.body.username, request.body.password);
    if (error) {
      response.status(400).json({ error: "failed to validate user" });
      return;
    }

    // silly of me to not properly use the async/await pattern here
    const existingUser = await User.findOne({
      username: request.body.username,
    });
    if (existingUser !== null) {
      return response.status(400).json({ error: "username must be unique" });
    }

    const user = await createUserHandler(request.body);

    await user.save();
    response.status(201).json(user);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

usersRouter.delete("/:id", async (request, response) => {
  if (!request.params.id) {
    response.status(400).end();
    return;
  }

  await User.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

export default usersRouter;
