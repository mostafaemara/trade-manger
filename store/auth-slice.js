import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    user: "",
    isAuthnticated: false


}

export const authSlice = createSlice({

    name: "auth",
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.isAuthnticated = true;
            state.user = {
                username: "Mostafa",
                email: "mostafa@gmail.com"
            }
            state.token = "sadasdasdfgfqwefasfcdsasdf";
        },
        logout(state, action) {
            state.user = "";
            state.token = "";
            state.isAuthnticated = false;

        },

    }

});
