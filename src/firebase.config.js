
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore   } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // Put ur firebase right here
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const getDataStorage = getStorage(app)
