import { useDispatch } from "react-redux";
import useField from "../hooks/useField";
import { login } from "../reducers/userReducer";

const Login = () => {
  const { reset: usernameReset, ...usernameProps } = useField(
    "text",
    "username"
  );
  const { reset: passwordReset, ...passwordProps } = useField(
    "password",
    "password"
  );

  const dispatch = useDispatch();

  const creds = {
    username: usernameProps.value,
    password: passwordProps.value,
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(creds));

    usernameReset();
    passwordReset();
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input {...usernameProps} data-testid="username" />
      </label>
      <label>
        Password:
        <input {...passwordProps} data-testid="password" />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
