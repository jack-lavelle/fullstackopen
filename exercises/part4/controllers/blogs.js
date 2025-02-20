import Blog from "../models/blog.js";
import router from "express";
import { getAuthorizedUserFromRequest } from "../utils/auth_helper.js";

const blogsRouter = router.Router();

blogsRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({}).populate("user", {
    id: 1,
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  if (!request.params.id) {
    response.status(400).end();
    return;
  }
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    response.status(404).end();
    return;
  }
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  let user;
  try {
    user = await getAuthorizedUserFromRequest(request);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }

  if (user === null) {
    return response.status(401).json({ error: "invalid token" });
  }

  if (!request.body.title || !request.body.url) {
    return response.status(400).end();
  }

  request.body.user = user.id;
  const blog = new Blog(request.body);
  if (!blog.likes) {
    blog.likes = 0;
  }

  await blog.save();
  response.status(201).json(blog);
});

blogsRouter.delete("/:id", async (request, response) => {
  if (!request.params.id) {
    response.status(400).end();
    return;
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.patch("/:id", async (request, response) => {
  if (!request.params.id) {
    response.status(400).end();
    return;
  }

  const updates = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!updatedBlog) {
      response.status(404).end();
      return;
    }

    response.status(200).json(updatedBlog);
  } catch (error) {
    response.status(400).json(error);
  }
});

export default blogsRouter;
