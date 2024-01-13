import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookCategories: [],
  loading: false,
  books: [],
  bookType: "all_categories",
  filterBy: "Default",
};
const bookCategoriesSlice = createSlice({
  name: "bookCategories",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBookByCategories: (state, action) => {
      state.bookCategories = action.payload;
    },
    setAllBook: (state, action) => {
      state.books = action.payload;
      state.loading = false;
    },
    setBookType: (state, action) => {
      state.bookType = action.payload;
    },
    setfilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    filterData: (state) => {
      state.bookCategories =
        state.bookType === "free"
          ? state.books.filter((item) => item.price === 0)
          : state.books.filter(
              (item) => item.categories === state.bookType && item.price !== 0
            );

      if (state.filterBy === "High") {
        state.bookCategories = state.bookCategories.sort(
          (a, b) => b.price - a.price
        );
      } else if (state.filterBy === "Low") {
        state.bookCategories = state.bookCategories.sort(
          (a, b) => a.price - b.price
        );
      }
    },
  },
});
export const {
  setLoading,
  setBookByCategories,
  setAllBook,
  setBookType,
  setfilterBy,
  filterData,
} = bookCategoriesSlice.actions;
export default bookCategoriesSlice.reducer;
export const getBook = (state) => state.bookCategories.books;
export const getBookByCategories = (state) =>
  state.bookCategories.bookCategories;
export const getLoading = (state) => state.bookCategories.loading;
export const getBookType = (state) => state.bookCategories.bookType;
export const getFilterBy = (state) => state.bookCategories.filterBy;
