import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import storage from "../services/storage";
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const user = storage.loadUser();
    dispatch(setUser(user));
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);

      dispatch(setUser(user));
      dispatch(
        setNotification(
          { message: `Welcome back, ${user.name}`, type: "success" },
          5
        )
      );
      storage.saveUser(user);
    } catch (error) {
      dispatch(
        setNotification({ message: "Wrong credentials", type: "error" }, 5)
      );
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(setUser(null));
    storage.removeUser();
  };
};

export default userSlice.reducer;
