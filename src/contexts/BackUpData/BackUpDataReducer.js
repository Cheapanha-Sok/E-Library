export const BackDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_ALL_BACK_DATA":
      return {
        ...state,
        listsBackUpData: action.payload,
        loading: false,
      };
  }
};
