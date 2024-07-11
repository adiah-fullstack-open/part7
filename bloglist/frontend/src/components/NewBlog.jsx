import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const NewBlog = ({ blogFormRef }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    author: "",
  });

  const { title, url, author } = formData;

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const dispatch = useDispatch();

  const notify = (message, type = "success") => {
    dispatch(setNotification({ message, type }, 5));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(createBlog(formData));
    notify(`Blog created: ${title}, ${author}`);

    blogFormRef.current.toggleVisibility();

    setFormData({
      title: "",
      url: "",
      author: "",
    });
  };

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            data-testid="title"
            value={title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="text"
            data-testid="url"
            value={url}
            name="url"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            data-testid="author"
            value={author}
            name="author"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
