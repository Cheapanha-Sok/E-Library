import { auth, db, getDataStorage } from "../firebase.config";
import { toast } from "react-toastify";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    const docRef = doc(db, "users", user.uid);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName,
        email: user.email,
        userImage: "",
        phoneNumber: "XXX-XXX-XXX",
        role: "user",
      });
      return true;
    }
    toast.success("Welcome to our website");
    return true;
  } catch (error) {
    toast.error("An error occurred during sign-in.");
  }
};

export const resetPassword = async (email) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(
        `Success! Please check ${email} to proceed with the password reset.`
      );
      return true;
    } catch (error) {
      console.log(error);
    }
  } else {
    toast.error("Incorrect email. Please try again.");
  }
};

export const signUp = async (username, email, password, confirmPassword) => {
  if (password !== confirmPassword) {
    toast.error("The password does not match.");
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userData = {
      username,
      email,
      userImage: "",
      phoneNumber: "XXX-XXX-XXX",
      role: "user",
    };
    await setDoc(doc(db, "users", user.uid), userData);
    toast.success("Registration successful. Welcome to our website");
    return true;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      toast.error("This email is already in use!");
    } else {
      toast.error("An error occurred during sign-up.");
    }
  }
};

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Welcome to our website");
    return true;
  } catch (error) {
    if (error.code === "auth/invalid-login-credentials") {
      toast.error("Incorrect password. Please try again.");
    } else {
      toast.error("An error occurred during sign-in.");
    }
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        resolve(null);
      }
    });
  });
};
export const getUserData = async (callback) => {
  try {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    return onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data());
        }
      },
      (error) => {
        console.log(error);
      }
    );
  } catch (error) {
    console.error("Error getting document: ", error);
  }
};
export const updateUserData = async (username, phoneNumber, userImage) => {
  try {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const docSnapshot = await getDoc(userRef);

    if (username && username !== docSnapshot.data().username) {
      await updateDoc(userRef, { username });
    }
    if (phoneNumber && phoneNumber !== docSnapshot.data().phoneNumber) {
      await updateDoc(userRef, { phoneNumber });
    }

    if (userImage) {
      const imageRef = ref(
        getDataStorage,
        `users/userImage/${auth.currentUser.uid}`
      );
      await uploadBytes(imageRef, userImage);
      const imageUrl = await getDownloadURL(imageRef);
      await updateDoc(userRef, {
        userImage: imageUrl,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getUserOrder = (callback) => {
  try {
    const orderRef = doc(db, "orderHistory", auth.currentUser.uid);
    return onSnapshot(
      orderRef,
      (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data());
        }
      },
      (error) => {
        console.log(error);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
