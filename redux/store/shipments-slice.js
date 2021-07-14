import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchShipments, postShipment } from "../../services/api/api";

const initialState = {
  shipment: "",
  ui: {
    shipmentModalShow: false,
    errorAlertShow: false,
  },
  totalItems: 0,
  shipments: [],
  totalPages: 0,
  currentPage: 0,
  status: "idle",
  error: "",
};
export const fetchShipmentsThunk = createAsyncThunk(
  "/shipments",
  async (props, { rejectWithValue }) => {
    try {
      const response = await fetchShipments(
        props.page,
        props.size,
        props.token
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.request.response);
    }
  }
);
export const editeShipmentThunk = createAsyncThunk(
  "/edite-shipment",
  async (props, { rejectWithValue }) => {
    try {
      const response = await postShipment(props.shipment, props.token);

      return response;
    } catch (error) {
      return rejectWithValue(error.request.response);
    }
  }
);
export const addNewShipmentThunk = createAsyncThunk(
  "/new-shipment",
  async (props, { rejectWithValue }) => {
    try {
      const response = await postShipment(props.shipment, props.token);

      return response;
    } catch (error) {
      return rejectWithValue(error.request.response);
    }
  }
);

export const shipmentsSlice = createSlice({
  name: "shipments",
  initialState: initialState,

  reducers: {
    showShipmentModal(state, action) {
      if (action.payload) {
        console.log("shipment", action.payload);
        state.shipment = action.payload;
      }
      state.ui.shipmentModalShow = true;
    },

    hideShipmentModal(state, action) {
      state.shipment = "";
      state.ui.shipmentModalShow = false;
    },
    hideErrorAlert(state, action) {
      state.ui.errorAlertShow = false;
    },
  },

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
      state.ui.errorAlertShow = true;
      console.log("Error Shipments Fetching", action.meta);
      state.status = "failed";
      state.error = "Fetching Shipments Faild!";
    },
    [addNewShipmentThunk.pending]: (state, action) => {
      state.status = "loading";
      state.ui.shipmentModalShow = false;
    },
    [addNewShipmentThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.shipments.push(action.payload.shipment);
    },
    [addNewShipmentThunk.rejected]: (state, action) => {
      state.status = "failed";
      state.ui.errorAlertShow = true;
      state.error = "Adding Shipment Faild!";
    },

    [editeShipmentThunk.pending]: (state, action) => {
      state.status = "loading";
      state.ui.shipmentModalShow = false;
    },
    [editeShipmentThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log("Sucess Edite");
      const index = state.shipments.findIndex(
        (shipment) => shipment._id === action.payload.shipment._id
      );
      state.shipments[index] = action.payload.shipment;
    },
    [editeShipmentThunk.rejected]: (state, action) => {
      state.status = "failed";
      state.ui.errorAlertShow = true;
      state.error = "Editing Shipment Failed!";
    },
  },
});

export const selectTotalItems = (state) => state.shipments.totalItems;
export const selectShipments = (state) => state.shipments.shipments;
export const selectTotalPages = (state) => state.shipments.totalPages;
export const selectCurrentPage = (state) => state.shipments.currentPage;
export const selectStatus = (state) => state.shipments.status;
export const selectShipmentModalShow = (state) =>
  state.shipments.ui.shipmentModalShow;
export const selectError = (state) => state.shipments.error;
export const selectShipment = (state) => state.shipments.shipment;
export const selectErrorAlertShow = (state) =>
  state.shipments.ui.errorAlertShow;
export const { hideShipmentModal, showShipmentModal, hideErrorAlert } =
  shipmentsSlice.actions;
