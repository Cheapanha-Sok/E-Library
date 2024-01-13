import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
          setUserId(user.uid);
        }
      });
      return () => {
        unsubscribe();
        isMounted.current = false;
      };
    }
  }, [isMounted]);
  return { loggedIn, userId };
};
