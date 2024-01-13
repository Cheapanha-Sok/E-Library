import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBook: {},
  loading: false,
  currentCategories: [],
};

const book = createSlice({
  name: "currentBook",
  initialState,
  reducers: {
    setCurrentBook(state, action) {
      state.currentBook = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCurrentCategories(state, action) {
      const { payload } = action;
      const { bookId } = state.currentBook;
      state.currentCategories = payload.filter(
        (item) => item.bookId !== bookId
      );
    },
  },
});

export const { setCurrentBook, setLoading, setCurrentCategories } =
  book.actions;

export default book.reducer;

export const getBook = (state) => state.currentBook.currentBook;

export const getCategoriesBook = (state) => state.currentBook.currentCategories;
