import { createContext, useReducer } from "react";
import { OrderReducer } from "./OrderReducer";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const initialState = {
        listOrders: [],
        loading: false,
    };
    const [state, dispatch] = useReducer(OrderReducer, initialState);
    return (
        <OrderContext.Provider value={{ ...state, dispatch }}>
            {children}
        </OrderContext.Provider>
    );
};
export default OrderContext;
