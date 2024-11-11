const Blog = require("../models/blog");
const blogsRouter = require("express").Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
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

module.exports = blogsRouter;
