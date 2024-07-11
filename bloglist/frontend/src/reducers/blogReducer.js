import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

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
  };
};

export default blogSlice.reducer;
