import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiSignIn } from "../../services/api/api";
import jwt from "jsonwebtoken";

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
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (auth, { rejectWithValue }) => {
    try {
      const response = await apiSignIn(auth.email, auth.password);

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
    } catch (error) {
      return rejectWithValue(error.response.response);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout(state, action) {
      (state.user = {
        email: "",
        userId: "",
        name: "",
        authority: 0,
      }),
        (state.token = "");
      state.isAuthnticated = false;
    },
  },
  extraReducers: {
    [loginThunk.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log("action", action);
      console.log("state", state);
      state.isAuthnticated = true;
      (state.user.name = action.payload.name),
        (state.user.email = action.payload.email),
        (state.user.userId = action.payload.userId),
        (state.user.authority = action.payload.authority);
      state.token = action.payload.token;
    },
    [loginThunk.rejected]: (state, action) => {
      console.log("ERROR SSASA", action);
      state.status = "failed";
    },
  },
});
export const { login, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthnticated = (state) => state.auth.isAuthnticated;
export const selectAuthStatus = (state) => state.auth.status;
