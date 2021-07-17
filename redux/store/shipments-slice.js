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
  filter: {
    activeClient: false,

    client: "",
    activeStartDate: false,

    startDate: "",
    activeEndDate: false,
    endDate: "",
  },

  shipments: [],

  status: "idle",
  pagination: {
    limit: 30,
    totalItems: 0,
    canPreviousPage: "",
    previousPage: "",
    totalPages: 0,
    currentPage: 0,

    canNextPage: "",
    nextPage: "",
  },
};
export const fetchShipmentsThunk = createAsyncThunk(
  "/shipments",
  async (props, { rejectWithValue }) => {
    try {
      const response = await fetchShipments(props);

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
    setCurrentPage(state, action) {
      console.log("Set current Page", action.payload);
      state.pagination.currentPage = action.payload;
    },
    setLimit(state, action) {
      state.pagination.limit = action.payload;
    },
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
    toggleClientFilter(state, action) {
      state.filter.activeClient = !state.filter.activeClient;
    },
    toggleStartDateFilter(state, action) {
      state.filter.activeStartDate = !state.filter.activeStartDate;
    },
    toggleEndDateFilter(state, action) {
      state.filter.activeEndDate = !state.filter.activeEndDate;
    },
    setClientFilter(state, action) {
      console.log(state.filter.client);
      state.filter.client = action.payload;
    },
    setStartDateFilter(state, action) {
      console.log(state.filter.startDate);
      state.filter.startDate = action.payload;
    },
    setEndDateFilter(state, action) {
      console.log(state.filter.endDate);
      state.filter.endDate = action.payload;
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
  },

  extraReducers: {
    [fetchShipmentsThunk.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchShipmentsThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.pagination.currentPage = action.payload.currentPage;
      state.shipments = action.payload.shipments;
      state.pagination.totalItems = action.payload.totalItems;
      state.pagination.totalPages = action.payload.totalPages;
      state.pagination.canPreviousPage = action.payload.hasPrevPage;
      state.pagination.canNextPage = action.payload.hasNextPage;
      state.pagination.previousPage = action.payload.prevPage;
      state.pagination.nextPage = action.payload.nextPage;
      state.pagination.totalPages = action.payload.totalPages;
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

export const selectTotalItems = (state) =>
  state.shipments.pagination.totalItems;
export const selectShipments = (state) => state.shipments.shipments;
export const selectTotalPages = (state) =>
  state.shipments.pagination.totalPages;
export const selectLimit = (state) => state.shipments.pagination.limit;
export const selectCurrentPage = (state) =>
  state.shipments.pagination.currentPage;
export const selectStatus = (state) => state.shipments.status;
export const selectModal = (state) => state.shipments.ui.modal;
export const selectError = (state) => state.shipments.error;
export const selectDeleteModal = (state) => state.shipments.ui.deleteModal;
export const selectAlert = (state) => state.shipments.ui.alert;
export const selectFilter = (state) => state.shipments.filter;
export const selectPagination = (state) => state.shipments.pagination;
export const {
  setLimit,
  hideModal,
  showModal,
  hideAlert,
  ShowDeleteModal,
  hideDeleteModal,
  setClientFilter,
  setEndDateFilter,
  setStartDateFilter,
  toggleClientFilter,
  toggleStartDateFilter,
  toggleEndDateFilter,
  setPagination,
  setCurrentPage,
} = shipmentsSlice.actions;
