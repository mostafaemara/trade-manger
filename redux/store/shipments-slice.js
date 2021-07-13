import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchShipments, apiAddNewShipment } from "../../services/api/api";
const initialState = {
  totalItems: 0,
  shipments: [],
  totalPages: 0,
  currentPage: 0,
  status: "idle",
};
export const fetchShipmentsThunk = createAsyncThunk(
  "/shipments",
  async (props) => {
    console.log(props);
    const response = await apiFetchShipments(
      props.page,
      props.size,
      props.token
    );
    console.log(response);

    return response;
  }
);
export const addNewShipmentThunk = createAsyncThunk(
  "/new-shipment",
  async (props, { getState }) => {
    console.log(getState());
    const response = await apiAddNewShipment(props.shipment, props.token);

    return response;
  }
);

export const shipmentsSlice = createSlice({
  name: "shipments",
  initialState: initialState,

  extraReducers: {
    [fetchShipmentsThunk.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchShipmentsThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.currentPage = action.payload.currentPage;
      state.shipments = action.payload.shipments;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
    },
    [fetchShipmentsThunk.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addNewShipmentThunk.pending]: (state, action) => {
      state.status = "loading";
    },
    [addNewShipmentThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.shipments.push(action.payload.shipment);
    },
    [addNewShipmentThunk.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const selectTotalItems = (state) => state.shipments.totalItems;
export const selectShipments = (state) => state.shipments.shipments;
export const selectTotalPages = (state) => state.shipments.totalPages;
export const selectCurrentPage = (state) => state.shipments.currentPage;
export const selectStatus = (state) => state.shipments.status;
