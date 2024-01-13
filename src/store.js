import cartSlice from "./pages/user/cart/cartSlice.js";
import {configureStore} from "@reduxjs/toolkit";
import homeSlice from "./pages/user/home/homeSlice.js";
import userSlice from "./pages/user/user/userSlice.js";
import bookSlice from "./pages/user/book/bookSlice.js";
import bookCategoriesSlice from "./pages/user/bookCategories/bookCategoriesSlice.js";
import searchSlice from "./pages/user/SearchBar/searchSlice.js";
import orderSlice from "./pages/user/order/orderSlice.js";
import bookUserSlice from "./pages/user/BookUser/bookUserSlice.js";
import readBookSlice from "./pages/user/ReadBook/readBookSlice.js";
const store = configureStore({
  reducer: {
    cart: cartSlice,
    home : homeSlice,
    user: userSlice,
    currentBook: bookSlice,
    bookCategories: bookCategoriesSlice,
    search: searchSlice,
    order: orderSlice,
    userBooks: bookUserSlice,
    readBook : readBookSlice
  },
});

export default store