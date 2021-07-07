import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiSignIn } from "../../services/api/api";
import jwt from "jsonwebtoken";
import { token } from "morgan";

const initialState = {
  user: {
    email: "",
    userId: "",
    name: "",
  },
  token: "",

  status: "idle",
  isAuthnticated: false,
};
export const loginThunk = createAsyncThunk("auth/login", async (auth) => {
  console.log(auth);
  const response = await apiSignIn(auth.email, auth.password);
  console.log(response);
  const decodedData = jwt.decode(response.token);

  return {
    authority: decodedData.authority,
    email: decodedData.email,
    exp: decodedData.exp,
    iat: decodedData.iat,
    name: decodedData.name,
    userId: decodedData.userId,
    token: response.token,
  };
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout(state, action) {
      state.user ={
        email: "",
        userId: "",
        name: "",
      },
      state.token = "";
      state.isAuthnticated = false;
    },
  },
  extraReducers: {
    [loginThunk.pending]: (state, action) => {
      state.status = "Loading";
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.status = "Succeeded";
      state.isAuthnticated = true;
      state.user.name = action.payload.name,
        state.user.email = action.payload.email,
        state.user.userId = action.payload.userId,
      state.token = action.payload.token;
    },
    [loginThunk.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { login, logout } = authSlice.actions;
export const selectUser=state=>state.auth.user;
export const selectIsAuthnticated=state=>state.auth.isAuthnticated;