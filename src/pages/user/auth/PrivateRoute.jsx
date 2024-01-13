import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../../firebase.config.js";

export default function PrivateRoute({ children }) {
  const [userState, setUserState] = useState(null);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUserState(!!user);
    });
    return () => unSubscribe();
  }, []);
  
  if (userState === null) {
    return null;
  }
  return userState ? children : <Navigate to="/authentication" />;
}