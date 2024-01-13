import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";

export const getAllOrder = async (callback) => {
  const orderRef = collection(db, "orders");
  const unsubscribe = onSnapshot(
    orderRef,
    (docSnap) => {
      const list = [];
      docSnap.forEach((item) => {
        list.push({
          id: item.id,
          data: item.data(),
        });
      });
      console.log(list)
      callback(list);
    },
    (error) => {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  );
  return unsubscribe;
};
