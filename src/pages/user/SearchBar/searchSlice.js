import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: [],
  loading: false,
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setBookList(state, action) {
      state.book = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setBookList, setLoading } = searchSlice.actions;
export default searchSlice.reducer;
export const getAllBooks = (state) => state.search.book;
