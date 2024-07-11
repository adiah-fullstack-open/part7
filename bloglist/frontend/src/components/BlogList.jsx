import { useDispatch, useSelector } from "react-redux";
import { addLike, deleteBlog } from "../reducers/blogReducer";
import { notify } from "../reducers/notificationReducer";
import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const handleVote = async (blog) => {
    dispatch(addLike(blog.id));
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
      dispatch(notify(`Blog ${blog.title}, by ${blog.author} removed`));
    }
  };

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      {[...blogs].sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};
export default BlogList;
