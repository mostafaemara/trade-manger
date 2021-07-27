import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchClients,
  deleteClient,
  updateClient,
  postClient,
} from "../../services/api/api";

const initialState = {
  refresh: 1,
  ui: {
    modal: {
      show: false,
      client: "",
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

  clients: [],

  status: "idle",
};
export const fetchClientsThunk = createAsyncThunk(
  "/clients",
  async (props, { rejectWithValue }) => {
    try {
      const response = await fetchClients(props.token);

      return response;
    } catch (error) {
      return rejectWithValue(error.request.response);
    }
  }
);
export const editeClientsThunk = createAsyncThunk(
  "/edite-client",
  async (props, { rejectWithValue }) => {
    try {
      // console.log("Edite clientzzzzzzzz", props);
      const response = await updateClient(props.client, props.token);

      return response;
    } catch (error) {
      return rejectWithValue(error.request.response);
    }
  }
);
export const addNewClientThunk = createAsyncThunk(
  "/new-client",
  async (props, { rejectWithValue }) => {
    try {
      const response = await postClient(props.client, props.token);
      return response;
    } catch (error) {
      return rejectWithValue(error.request.response);
    }
  }
);
export const deleteClientThunk = createAsyncThunk(
  "/delete-client",
  async (props, { rejectWithValue }) => {
    try {
      const response = await deleteClient(props.id, props.token);
      return response;
    } catch (error) {
      return rejectWithValue(error.request.response);
    }
  }
);

export const clientsSlice = createSlice({
  name: "clients",
  initialState: initialState,

  reducers: {
    showModal(state, action) {
      if (action.payload) {
        state.ui.modal.client = action.payload;
      } else {
        state.ui.modal.client = "";
      }
      state.ui.modal.show = true;
    },

    hideModal(state, action) {
      state.ui.modal.client = "";
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
    [fetchClientsThunk.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchClientsThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.clients = action.payload.clients;
    },
    [fetchClientsThunk.rejected]: (state, action) => {
      state.ui.alert.show = true;
      state.clients = [];
      state.ui.alert.title = "خطاء";
      state.ui.alert.type = "error";
      state.ui.alert.content = "لم يتم جلب البينات حدث خطاء";
      state.status = "failed";
    },
    [addNewClientThunk.pending]: (state, action) => {
      state.status = "loading";
      state.ui.modal.show = false;
    },
    [addNewClientThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.refresh++;
      state.ui.alert.show = true;
      state.ui.alert.type = "success";
      state.ui.alert.title = "!تم";
      state.ui.alert.content = "تم الاضافة بنجاح";
    },
    [addNewClientThunk.rejected]: (state, action) => {
      state.status = "failed";
      state.ui.alert.show = true;
      state.ui.alert.title = "خطاء";
      state.ui.alert.type = "error";
      state.ui.alert.content = "!حدث خطاء  لم يتم الاضافة";
    },

    [editeClientsThunk.pending]: (state, action) => {
      state.status = "loading";
      state.ui.modal.show = false;
    },
    [editeClientsThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";

      const index = state.clients.findIndex(
        (client) => client._id === action.payload.client._id
      );
      state.clients[index] = action.payload.client;

      state.ui.alert.show = true;
      state.ui.alert.type = "success";
      state.ui.alert.title = "!تم";
      state.ui.alert.content = "تم تعديل الشحنة بنجاح";
    },
    [editeClientsThunk.rejected]: (state, action) => {
      state.status = "failed";

      state.ui.alert.show = true;
      state.ui.alert.type = "error";
      state.ui.alert.title = "خطاء";
      state.ui.alert.content = "لم يتم تعديل الشحنة";
    },
    [deleteClientThunk.pending]: (state, action) => {
      state.status = "loading";
      state.ui.deleteModal.show = false;
    },
    [deleteClientThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";

      const index = state.clients.findIndex(
        (client) => client._id === action.payload.client._id
      );
      if (index > -1) {
        state.clients.splice(index, 1);
      }

      state.ui.alert.show = true;
      state.ui.alert.type = "success";
      state.ui.alert.title = "!تم";
      state.ui.alert.content = "تم حزف الشحنة بنجاح";
    },
    [deleteClientThunk.rejected]: (state, action) => {
      state.status = "failed";

      state.ui.alert.show = true;
      state.ui.alert.type = "error";
      state.ui.alert.title = "Error";
      state.ui.alert.content = "Deleting client Failed!";
    },
  },
});

export const selectClients = (state) => state.clients.clients;

export const selectStatus = (state) => state.clients.status;
export const selectModal = (state) => state.clients.ui.modal;
export const selectError = (state) => state.clients.error;
export const selectDeleteModal = (state) => state.clients.ui.deleteModal;
export const selectAlert = (state) => state.clients.ui.alert;

export const selectRefresh = (state) => state.clients.refresh;
export const {
  hideModal,
  showModal,
  hideAlert,
  ShowDeleteModal,
  hideDeleteModal,
} = clientsSlice.actions;
