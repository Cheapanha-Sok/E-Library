import  { useState } from 'react'
import Login from './components/Login';
import Register from "./components/Register"
import UpdatePassword from "./components/UpdatePassword"
import { Navigate } from 'react-router-dom';
import {useAuthStatus} from "../../../hook/useAuthStatus.js";

export default function Authentication() {
    const [authOption, setAuthOption] = useState("Sign In");
    let authToShow = null;
    const { loggedIn } = useAuthStatus();
    switch (authOption) {
        case "Sign In":
            authToShow = (
                <Login setAuthOption={setAuthOption} />
            );
            break;
        case "Sign Up":
            authToShow = (
                <Register setAuthOption={setAuthOption} />
            );
            break;
        case "Forget Password":
            authToShow = (
                <UpdatePassword setAuthOption={setAuthOption} />
            );
            break;
        default:
            break;
    }
    if (loggedIn) {
        return <Navigate to="/" />;
    }
    return (
        <div className="flex justify-center items-center p-5 md:p-0 h-full md:h-[80vh]">
            <div className="max-w-5xl mx-auto">
                <div className="flex shadow-2xl rounded-xl">
                    {authToShow}
                </div>
            </div>
        </div>
    )
}
