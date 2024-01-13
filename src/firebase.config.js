
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore   } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlCzQw0jACqDXO2291PKuEgTOEb84B1Wo",
  authDomain: "project-website-e-library.firebaseapp.com",
  projectId: "project-website-e-library",
  storageBucket: "project-website-e-library.appspot.com",
  messagingSenderId: "962962738093",
  appId: "1:962962738093:web:c24fb69d1060d6ba942f24",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const getDataStorage = getStorage(app)
