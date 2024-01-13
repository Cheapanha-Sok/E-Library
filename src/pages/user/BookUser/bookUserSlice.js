// bookUserSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookList: [],
  loading: false,
};

const userBookSlice = createSlice({
  name: "userBooks",
  initialState,
  reducers: {
    setBooklist: (state, action) => {
      state.bookList = action.payload;
      state.loading = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setBooklist, setLoading, setCurrentBook } =
  userBookSlice.actions;

export default userBookSlice.reducer;
export const getAllBooks = (state) => state.userBooks.bookList;
export const getloading = (state) => state.userBooks.loading;
export const getBook = (state) => state.userBooks.currentBook;
