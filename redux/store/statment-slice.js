import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStatment } from "../../services/api/api";

const initialState = {
  ui: {
    alert: {
      show: false,
      type: "",
      title: "",
      content: "",
    },
  },
  filter: {
    client: "",
  },

  statment: {
    client: "",
    shipments: [],
    payments: [],
    debts: 0,
    dues: 0,
    totalNetWeight: 0,
    totalKantarWeight: 0,
  },

  status: "idle",
};
export const fetchStatmentThunk = createAsyncThunk(
  "/statment",
  async (props, { rejectWithValue }) => {
    try {
      const response = await fetchStatment(props);

      return response;
    } catch (error) {
      return rejectWithValue(error.request.response);
    }
  }
);

export const statmentSlice = createSlice({
  name: "statment",
  initialState: initialState,

  reducers: {
    hideAlert(state, action) {
      state.ui.alert.show = false;
    },

    setClientFilter(state, action) {
      state.filter.client = action.payload;
    },
  },

  extraReducers: {
    [fetchStatmentThunk.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchStatmentThunk.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.statment = action.payload.statment;
    },
    [fetchStatmentThunk.rejected]: (state, action) => {
      state.ui.alert.show = true;
      state.statment = {};
      state.ui.alert.title = "خطاء";
      state.ui.alert.type = "error";
      state.ui.alert.content = "لم يتم جلب البينات حدث خطاء";
      state.status = "failed";
    },
  },
});

export const selectStatment = (state) => state.statment.statment;

export const selectStatus = (state) => state.statment.status;

export const selectAlert = (state) => state.statment.ui.alert;
export const selectFilter = (state) => state.statment.filter;

export const {
  hideAlert,

  setClientFilter,
} = statmentSlice.actions;
