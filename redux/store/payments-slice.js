import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPayments,
  deletePayment,
  updatePayment,
  postPayment,
} from "../../services/api/api";

const initialState = {
  refresh: 1,
  ui: {
    modal: {
      show: false,
      payment: "",
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

  payments: [],

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
export const fetchPaymentsThunk = createAsyncThunk(
  "/Payments",
  async (props, { rejectWithValue }) => {
    try {
      const response = await fetchPayments(props);

      return response;
    } catch (error) {
      return rejectWithValue(error.request.response);
    }
  }
);
export const editePaymentThunk = createAsyncThunk(
  "/edite-payment",
  async (props, { rejectWithValue }) => {
    try {
      // console.log("Edite Paymentzzzzzzzz", props);
      const response = await updatePayment(props.payment, props.token);

      return response;
    } catch (error) {
      return rejectWithValue(error.request.response);
    }
  }
);
export const addNewPaymentThunk = createAsyncThunk(
  "/new-payment",
  async (props, { rejectWithValue }) => {
    console.log("post paymentz", props);
    try {
      const response = await postPayment(props.payment, props.token);
      return response;
    } catch (error) {
      console.log("post paymentz", error.request.response);
      return rejectWithValue(error.request.response);
    }
  }
);
export const deletePaymentThunk = createAsyncThunk(
  "/delete-payment",
  async (props, { rejectWithValue }) => {
    try {
      const response = await deletePayment(props.id, props.token);
      return response;
    } catch (error) {
      return rejectWithValue(error.request.response);
    }
  }
);

export const paymentsSlice = createSlice({
  name: "payments",
  initialState: initialState,

  reducers: {
    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload;
    },
    setLimit(state, action) {
      state.pagination.limit = action.payload;
    },
    showModal(state, action) {
      if (action.payload) {
        state.ui.modal.payment = action.payload;
      } else {
        state.ui.modal.payment = "";
      }
      state.ui.modal.show = true;
    },

    hideModal(state, action) {
      state.ui.modal.payment = "";
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
      state.filter.activeClient = action.payload;
    },
    toggleStartDateFilter(state, action) {
      state.filter.activeStartDate = action.payload;
    },
    toggleEndDateFilter(state, action) {
      state.filter.activeEndDate = action.payload;
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
    [fetchPaymentsThunk.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPaymentsThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.pagination.currentPage = action.payload.currentPage;
      state.payments = action.payload.payments;
      state.pagination.totalItems = action.payload.totalItems;
      state.pagination.totalPages = action.payload.totalPages;
      state.pagination.canPreviousPage = action.payload.hasPrevPage;
      state.pagination.canNextPage = action.payload.hasNextPage;
      state.pagination.previousPage = action.payload.prevPage;
      state.pagination.nextPage = action.payload.nextPage;
      state.pagination.totalPages = action.payload.totalPages;
    },
    [fetchPaymentsThunk.rejected]: (state, action) => {
      state.ui.alert.show = true;
      state.payments = [];
      state.ui.alert.title = "خطاء";
      state.ui.alert.type = "error";
      state.ui.alert.content = "لم يتم جلب البينات حدث خطاء";
      state.status = "failed";
    },
    [addNewPaymentThunk.pending]: (state, action) => {
      state.status = "loading";
      state.ui.modal.show = false;
    },
    [addNewPaymentThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.refresh++;
      state.ui.alert.show = true;
      state.ui.alert.type = "success";
      state.ui.alert.title = "!تم";
      state.ui.alert.content = "تم الاضافة بنجاح";
    },
    [addNewPaymentThunk.rejected]: (state, action) => {
      state.status = "failed";
      state.ui.alert.show = true;
      state.ui.alert.title = "خطاء";
      state.ui.alert.type = "error";
      state.ui.alert.content = "!حدث خطاء  لم يتم الاضافة";
    },

    [editePaymentThunk.pending]: (state, action) => {
      state.status = "loading";
      state.ui.modal.show = false;
    },
    [editePaymentThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";

      const index = state.payments.findIndex(
        (Payment) => Payment._id === action.payload.payment._id
      );
      state.payments[index] = action.payload.payment;

      state.ui.alert.show = true;
      state.ui.alert.type = "success";
      state.ui.alert.title = "!تم";
      state.ui.alert.content = "تم تعديل الشحنة بنجاح";
    },
    [editePaymentThunk.rejected]: (state, action) => {
      state.status = "failed";

      state.ui.alert.show = true;
      state.ui.alert.type = "error";
      state.ui.alert.title = "خطاء";
      state.ui.alert.content = "لم يتم تعديل الشحنة";
    },
    [deletePaymentThunk.pending]: (state, action) => {
      state.status = "loading";
      state.ui.deleteModal.show = false;
    },
    [deletePaymentThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";

      const index = state.payments.findIndex(
        (payment) => payment._id === action.payload.payment._id
      );
      if (index > -1) {
        state.payments.splice(index, 1);
      }

      state.ui.alert.show = true;
      state.ui.alert.type = "success";
      state.ui.alert.title = "!تم";
      state.ui.alert.content = "تم حزف الشحنة بنجاح";
    },
    [deletePaymentThunk.rejected]: (state, action) => {
      state.status = "failed";

      state.ui.alert.show = true;
      state.ui.alert.type = "error";
      state.ui.alert.title = "Error";
      state.ui.alert.content = "Deleting Payment Failed!";
    },
  },
});

export const selectTotalItems = (state) => state.payments.pagination.totalItems;
export const selectPayments = (state) => state.payments.payments;
export const selectTotalPages = (state) => state.payments.pagination.totalPages;
export const selectLimit = (state) => state.payments.pagination.limit;
export const selectCurrentPage = (state) =>
  state.payments.pagination.currentPage;
export const selectStatus = (state) => state.payments.status;
export const selectModal = (state) => state.payments.ui.modal;
export const selectError = (state) => state.payments.error;
export const selectDeleteModal = (state) => state.payments.ui.deleteModal;
export const selectAlert = (state) => state.payments.ui.alert;
export const selectFilter = (state) => state.payments.filter;
export const selectPagination = (state) => state.payments.pagination;
export const selectRefresh = (state) => state.payments.refresh;
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
} = paymentsSlice.actions;
