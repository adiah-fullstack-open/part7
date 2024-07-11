import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import storage from "../services/storage";
import { notify } from "./notificationReducer";

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
      dispatch(notify(`Welcome back, ${user.name}`));
      storage.saveUser(user);
    } catch (error) {
      dispatch(notify("Wrong credentials", "error"));
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
