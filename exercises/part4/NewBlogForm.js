import React, { useState, useRef } from "react";

const NewBlogForm = (props) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const newBlogFormRef = useRef();

  const addBlog = async () => {
    try {
      await blogService.create(newBlog);
      props.setBlogs(props.blogs.concat(newBlog));
      props.setSuccessMessage(
        `Successfully added a new blog "${newBlog.title}" by ${newBlog.author} added!`,
      );
      setTimeout(() => {
        props.setSuccessMessage(null);
      }, 5000);
      newBlogFormRef.current.toggleVisibility();
    } catch (exception) {
      console.error("Error adding new blog:", exception);
      setErrorMessage("Failed to add new blog.");
      setTimeout(() => {
        props.setErrorMessage(null);
      }, 5000);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNewBlog = (event) => {
    event.preventDefault();
    addBlog(newBlog);
  };

  return (
    <Toggleable buttonLabel="Create New Blog" ref={newBlogFormRef}>
      <form onSubmit={handleSubmitNewBlog}>
        <div>
          title{" "}
          <input
            type="text"
            value={newBlog?.title || ""}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          author{" "}
          <input
            type="text"
            value={newBlog?.author || ""}
            name="author"
            onChange={handleChange}
          />
        </div>
        <div>
          url{" "}
          <input
            type="text"
            value={newBlog?.url || ""}
            name="url"
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </Toggleable>
  );
};

export default NewBlogForm;
