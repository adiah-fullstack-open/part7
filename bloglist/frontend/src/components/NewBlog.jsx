import React from "react";
import { useDispatch } from "react-redux";
import useField from "../hooks/useField";
import { createBlog } from "../reducers/blogReducer";

const NewBlog = ({ blogFormRef }) => {
  const { reset: titleReset, ...titleProps } = useField("text", "title");
  const { reset: urlReset, ...urlProps } = useField("url", "url");
  const { reset: authorReset, ...authorProps } = useField("text", "author");

  const formData = {
    title: titleProps.value,
    url: urlProps.value,
    author: urlProps.value,
  };

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(createBlog(formData));

    blogFormRef.current.toggleVisibility();

    titleReset();
    urlReset();
    authorReset();
  };

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input {...titleProps} />
        </div>
        <div>
          <label>URL:</label>
          <input {...urlProps} />
        </div>
        <div>
          <label>Author:</label>
          <input {...authorProps} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
