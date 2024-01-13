import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  orderSummary: [],
  totalPriceOrder: 0,
  loadingCheckOut : false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingCheckOut: (state, action) => {
      state.loadingCheckOut = action.payload;
      state.loadingCheckOut = false
    },
    setOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
      state.loading = false;
    },
    setTotalPriceOrder: (state, action) => {
      state.totalPriceOrder = action.payload;
    },
  },
});

export const {
  setLoading,
  setOrderSummary,
  setTotalPriceOrder,
  setLoadingCheckOut,
  setBooklist,
} = orderSlice.actions;

export default orderSlice.reducer;
export const getOrderSummary = (state) => state.order.orderSummary;
export const getTotalPriceOrder = (state) => state.order.totalPriceOrder;
export const getLoading = (state) => state.order.loading;
