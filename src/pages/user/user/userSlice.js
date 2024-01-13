import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  order: [],
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOrder : (state , action)=>{
      state.order = action.payload;
      state.loading = false
    }
  },
});

export const { setUser, setLoading , setOrder } = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state) => state.user.user;
export const getLoading = (state) => state.user.loading;
export const getOrder = (state) => state.user.order;