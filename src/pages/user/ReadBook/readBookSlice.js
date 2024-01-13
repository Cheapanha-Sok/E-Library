import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBook: {},
  loading: false,
  isInBookMark: false,
};

const readBookSlice = createSlice({
  name: "readBook",
  initialState,
  reducers: {
    setCurrentBook(state, action) {
      state.currentBook = action.payload;
      state.isInBookMark = true;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setCurrentBook, setLoading, resetIsBookMark } =
  readBookSlice.actions;

export default readBookSlice.reducer;
export const getBook = (state) => state.readBook.currentBook;
export const isTrue = (state) => state.readBook.isInBookMark;
export const getLoading = (state) => state.readBook.loading;
