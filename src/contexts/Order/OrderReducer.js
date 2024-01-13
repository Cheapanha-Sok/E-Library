export const OrderReducer = (state , action)=>{
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          loading: true,
        };
      case "GET_ALL_ORDER":
        return {
          ...state,
          listOrders: action.payload,
          loading: false,
        };
    }
}
