
import { apiFetchClients } from "../../services/api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




const initialState = {
    clients: [],
    status: "idle"


};
export const fetchClientsThunk = createAsyncThunk("/clients", async (props) => {

    const response = await apiFetchClients(props.token);
    console.log(response);
    return response;
});

export const clientsSlice = createSlice({
    name: "clients",
    initialState: initialState,
    extraReducers: {

        [fetchClientsThunk.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchClientsThunk.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.clients = action.payload.clients;

        },
        [fetchClientsThunk.rejected]: (state, action) => {
            state.status = "failed";

        }
    }
});
export const selectClients = state => state.clients.clients
export const selectStatus = state => state.clients.status;