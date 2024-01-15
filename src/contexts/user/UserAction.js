import { auth, db } from "../../firebase.config";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

export const getAllUser = (callback) => {
  const userCollRef = collection(db, "users");
  const unsubscribe = onSnapshot(
    userCollRef,
    (docSnap) => {
      const list = [];
      docSnap.forEach((item) => {
        if (item.data().role !== "admin") {
          list.push({
            userId: item.id,
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
export const updateUserRole = async (role, userId) => {
  try {
    const userRef = doc(db, "users", userId);
    if (role) {
      await updateDoc(userRef, {
        role,
      });
      toast.success(`Change role to ${role} success`);
    }
  } catch (error) {
    toast.error("Something when wrong");
  }
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
