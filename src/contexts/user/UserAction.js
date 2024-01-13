import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase.config";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userRef);
    const userData = docSnap.data().role;
    if (userData === "admin" || userData === "author") {
      toast.success(`Welcome ${userData}`);
      return true;
    }
  } catch (error) {
    toast.error("Unauthorized");
    console.log(error);
  }
};

export const logOut = async () => {
  try {
    signOut(auth);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUser = (callback) => {
  const userCollRef = collection(db, "users");
  const unsubscribe = onSnapshot(
    userCollRef,
    (docSnap) => {
      const list = [];
      docSnap.forEach((item) => {
        if (item.data().role !== "admin") {
          list.push({
            id: item.id,
            data: item.data(),
          });
        }
      });
      callback(list);
    },
    (error) => {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  );
  return unsubscribe;
};

export const calculateUser = (Userdata) => {
  const typeCount = {
    user: 0,
    author: 0,
  };
  Userdata.forEach((user) => {
    const type = user.data.role.toLowerCase();
    if (type in typeCount) {
      typeCount[type]++;
    }
  });
  return typeCount;
};
export const signUp = async (
  username,
  email,
  currentPassword,
  confirmPassword,
  phoneNumber,
  role
) => {
  if (currentPassword !== confirmPassword) {
    toast.error("The password does not match.");
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      currentPassword
    );
    const user = userCredential.user;
    const userData = {
      username,
      email,
      userImage: "",
      phoneNumber,
      role,
    };
    await setDoc(doc(db, "users", user.uid), userData);
    toast.success("Registration successful.");
    await logOut()
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      toast.error("This email is already in use!");
    } else {
      toast.error("An error occurred during sign-up.");
    }
  }
};
