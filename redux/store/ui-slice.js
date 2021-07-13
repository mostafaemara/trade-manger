import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  newShipmentModalShow: false,
};
export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    showNewShipmentModal(state, action) {
      console.log("hello");
      state.newShipmentModalShow = true;
    },
    hideNewShipmentModal(state, action) {
      state.newShipmentModalShow = false;
    },
  },
});
export const { hideNewShipmentModal, showNewShipmentModal } = uiSlice.actions;
export const selectNewShipmentModalShow = (state) =>
  state.ui.newShipmentModalShow;
