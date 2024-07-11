import { createRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { initializeBlogs } from "./reducers/blogReducer";
import { notify } from "./reducers/notificationReducer";
import { initializeUser, logout } from "./reducers/userReducer";

const App = () => {
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
  }, []);

  const blogFormRef = createRef();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(notify(`Bye, ${user.name}!`));
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <Login />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
