import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth-slice";
import {fetchApiPaths} from "./auth-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    
    
    
    
});
export default store;
export const { login, logout } = authSlice.actions;
