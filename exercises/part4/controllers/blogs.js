import Blog from "../models/blog.js";
import router from "express";

const blogsRouter = router.Router();
blogsRouter.get("/", async (request, response) => {
  const user = request.user;
  if (!user) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  const blogs = await Blog.find({ user: user._id }).populate("user", {
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
  if (!request.body.title || !request.body.url) {
    return response.status(400).end();
  }

  let body = request.body;
  body.user = request.user.id;
  const blog = new Blog(body);
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

  const blogID = request.params.id;
  const blog = await Blog.findById(blogID);
  if (!blog) {
    response.status(404).end();
    return;
  }
  if (blog.user.toString() !== request.user.id) {
    return response.status(401).json({ error: "invalid token" });
  }

  await Blog.findByIdAndDelete(blogID);
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
