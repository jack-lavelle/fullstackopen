const Blog = require("../models/blog");
const blogsRouter = require("express").Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
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
  const blog = new Blog(request.body);
  if (!blog.title || !blog.url) {
    response.status(400).end();
    return;
  }

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

module.exports = blogsRouter;
