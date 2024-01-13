import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookList: [],
  loading: false,
  popularBook: [],
  latestBook: [],
  bestSelling: {},
};
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setBookList(state, action) {
      state.bookList = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPopularBook: (state) => {
      const popularBook = state.bookList.filter((item) => item.isBought);
      state.popularBook = popularBook.sort((a, b) => b.isBought - a.isBought);
    },
    setLatestBook: (state) => {
      state.latestBook = state.bookList.slice().reverse().slice(0, 4);
    },
    setBestSelling: (state) => {
      state.bestSelling = state.popularBook[0];
    },
  },
});

export const {
  setBookList,
  setLoading,
  setPopularBook,
  setLatestBook,
  setBestSelling,
} = homeSlice.actions;

export default homeSlice.reducer;

export const getPopularBooks = (state) => state.home.popularBook;
export const getLoading = (state) => state.home.loading;
export const getLatestBook = (state) => state.home.latestBook;
export const getBestSelling = (state) => state.home.bestSelling;
