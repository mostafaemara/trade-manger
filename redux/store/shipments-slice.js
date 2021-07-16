import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchShipments,
  postShipment,
  deleteShipment,
} from "../../services/api/api";

const initialState = {
  ui: {
    modal: {
      show: false,
      shipment: "",
    },
    alert: {
      show: false,
      type: "",
      title: "",
      content: "",
    },
    deleteModal: {
      show: false,
      id: "",
    },
  },
  totalItems: 0,
  shipments: [],
  totalPages: 0,
  currentPage: 0,
  status: "idle",
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
export const deleteShipmentThunk = createAsyncThunk(
  "/delete-shipment",
  async (props, { rejectWithValue }) => {
    try {
      const response = await deleteShipment(props.id, props.token);

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
    showModal(state, action) {
      if (action.payload) {
        state.ui.modal.shipment = action.payload;
      }
      state.ui.modal.show = true;
    },

    hideModal(state, action) {
      state.ui.modal.shipment = "";
      state.ui.modal.show = false;
    },
    hideAlert(state, action) {
      state.ui.alert.show = false;
    },
    hideDeleteModal(state, action) {
      state.ui.deleteModal.show = false;
    },
    ShowDeleteModal(state, action) {
      state.ui.deleteModal.show = true;
      state.ui.deleteModal.id = action.payload;
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
      state.ui.alert.show = true;
      state.ui.alert.title = "Error";
      state.ui.alert.type = "error";
      state.ui.alert.content = "Fetching Shipments Failed!";
      state.status = "failed";
    },
    [addNewShipmentThunk.pending]: (state, action) => {
      state.status = "loading";
      state.ui.modal.show = false;
    },
    [addNewShipmentThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.shipments.push(action.payload.shipment);
      state.ui.alert.show = true;
      state.ui.alert.type = "success";
      state.ui.alert.title = "Done!";
      state.ui.alert.content = "Adding Shipment Success!";
    },
    [addNewShipmentThunk.rejected]: (state, action) => {
      state.status = "failed";
      state.ui.alert.show = true;
      state.ui.alert.title = "Error";
      state.ui.alert.type = "error";
      state.ui.alert.content = "Adding Shipment Failed!";
    },

    [editeShipmentThunk.pending]: (state, action) => {
      state.status = "loading";
      state.ui.modal.show = false;
    },
    [editeShipmentThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";

      const index = state.shipments.findIndex(
        (shipment) => shipment._id === action.payload.shipment._id
      );
      state.shipments[index] = action.payload.shipment;

      state.ui.alert.show = true;
      state.ui.alert.type = "success";
      state.ui.alert.title = "Done!";
      state.ui.alert.content = "Editing Shipment Success!";
    },
    [editeShipmentThunk.rejected]: (state, action) => {
      state.status = "failed";

      state.ui.alert.show = true;
      state.ui.alert.type = "error";
      state.ui.alert.title = "Error";
      state.ui.alert.content = "Editing Shipment Failed!";
    },
    [deleteShipmentThunk.pending]: (state, action) => {
      state.status = "loading";
      state.ui.deleteModal.show = false;
    },
    [deleteShipmentThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";

      const index = state.shipments.findIndex(
        (shipment) => shipment._id === action.payload.shipment._id
      );
      if (index > -1) {
        state.shipments.splice(index, 1);
      }

      state.ui.alert.show = true;
      state.ui.alert.type = "success";
      state.ui.alert.title = "Done!";
      state.ui.alert.content = "Deleting Shipment Success!";
    },
    [deleteShipmentThunk.rejected]: (state, action) => {
      state.status = "failed";

      state.ui.alert.show = true;
      state.ui.alert.type = "error";
      state.ui.alert.title = "Error";
      state.ui.alert.content = "Deleting Shipment Failed!";
    },
  },
});

export const selectTotalItems = (state) => state.shipments.totalItems;
export const selectShipments = (state) => state.shipments.shipments;
export const selectTotalPages = (state) => state.shipments.totalPages;
export const selectCurrentPage = (state) => state.shipments.currentPage;
export const selectStatus = (state) => state.shipments.status;
export const selectModal = (state) => state.shipments.ui.modal;
export const selectError = (state) => state.shipments.error;
export const selectDeleteModal = (state) => state.shipments.ui.deleteModal;
export const selectAlert = (state) => state.shipments.ui.alert;
export const {
  hideModal,
  showModal,
  hideAlert,
  ShowDeleteModal,
  hideDeleteModal,
} = shipmentsSlice.actions;
