export const BookStoreReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_ALL_BOOK":
      return {
        ...state,
        listBooks: action.payload,
        loading: false,
      };
  }
};
