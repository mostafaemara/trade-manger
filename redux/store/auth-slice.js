import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as apiLogin } from "../../services/api/api";

import { checkToken } from "../../utils/auth-helper";
const initialState = {
  error: {
    message: "",
    title: "",
  },
  user: {
    email: "",
    userId: "",
    name: "",
    authority: "",
  },
  token: "",

  status: "idle",
  isAuthnticated: false,
};
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (auth, { rejectWithValue }) => {
    try {
      const response = await apiLogin(auth.email, auth.password);

      const decodedToken = checkToken(response.token);

      return {
        authority: decodedToken.authority,
        email: decodedToken.email,
        exp: decodedToken.exp,
        iat: decodedToken.iat,
        name: decodedToken.name,
        userId: decodedToken.userId,
        token: response.token,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    checkAuth(state, action) {
      try {
        checkToken(state.token);
      } catch (e) {
        state.error.message = e.message;
        state.error.title = e.name;
        state.status = "falied";
        state.error.title = "Session time out!";
        state.error.message = "Session timeout please login again";
        state.isAuthnticated = false;
        state.user.email = "";
        state.user.userId = "";
        state.user.name = "";
        state.user.authority = 0;
        localStorage.clear();
      }
    },
    setAuthntication(state, action) {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.userId = action.payload.userId;
      state.user.authority = action.payload.authority;
      state.token = action.payload.token;
      if (action.payload.token) {
        state.isAuthnticated = true;
      } else {
        state.isAuthnticated = false;
      }
    },
    logout(state, action) {
      state.user = {
        email: "",
        userId: "",
        name: "",
        authority: 0,
      };
      state.isAuthnticated = false;
      localStorage.clear();
    },
  },
  extraReducers: {
    [loginThunk.pending]: (state, action) => {
      state.error.title = "";
      state.error.message = "";
      state.status = "loading";
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.isAuthnticated = true;
      (state.user.name = action.payload.name),
        (state.user.email = action.payload.email),
        (state.user.userId = action.payload.userId),
        (state.user.authority = action.payload.authority);
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    [loginThunk.rejected]: (state, action) => {
      state.error.title = "Loging failed";
      state.error.message = "Logging failed! invalid email or password!";
      state.status = "failed";
    },
  },
});
export const { login, logout, setAuthntication, checkAuth } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthnticated = (state) => state.auth.isAuthnticated;
export const selectAuthStatus = (state) => state.auth.status;
export const selectError = (state) => state.auth.error;
