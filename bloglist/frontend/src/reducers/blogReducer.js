import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { notify } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlogs(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlogs, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlogs(newBlog));
    dispatch(notify(`Blog created: ${newBlog.title}, ${newBlog.author}`));
  };
};

export const addLike = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const blogToChange = blogs.find((blog) => blog.id === id);

    const updatedBlog = await blogService.update(id, {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    });

    dispatch(
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
    );
    dispatch(notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    await blogService.remove(id);
    dispatch(setBlogs(blogs.filter((b) => b.id !== id)));
  };
};

export default blogSlice.reducer;
