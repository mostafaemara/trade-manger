import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth-slice";
import { clientsSlice } from "./clients-slice";
import { shipmentsSlice } from "./shipments-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    shipments: shipmentsSlice.reducer,
    clients: clientsSlice.reducer,
  },
});
export default store;
export const { login, logout } = authSlice.actions;
