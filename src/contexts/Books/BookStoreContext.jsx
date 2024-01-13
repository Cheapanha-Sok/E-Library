import { createContext, useReducer } from "react";
import {BookStoreReducer} from "./BookStoreReducer"

const BookStoreContext = createContext();

export const BookStoreProvider = ({ children }) => {
  const initialState = {
    listBooks: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(BookStoreReducer, initialState);
  return (
    <BookStoreContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BookStoreContext.Provider>
  );
};
export default BookStoreContext;
