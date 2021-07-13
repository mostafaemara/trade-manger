import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth-slice";
import { clientsSlice } from "./clients-slice";
import { shipmentsSlice } from "./shipments-slice";
import { uiSlice } from "./ui-slice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    shipments: shipmentsSlice.reducer,
    clients: clientsSlice.reducer,
    ui: uiSlice.reducer,
  },
});
export default store;
export const { login, logout } = authSlice.actions;
