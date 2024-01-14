import { createContext, useReducer } from "react";
import { BackDataReducer } from "./BackUpDataReducer";

const BackUpDataContext = createContext();

export const BackUpDataProvider = ({ children }) => {
    const initialState = {
        listsBackUpData: [],
        loading: false,
    };
    const [state, dispatch] = useReducer(BackDataReducer, initialState);
    return (
        <BackUpDataContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BackUpDataContext.Provider>
    );
};
export default BackUpDataContext;
