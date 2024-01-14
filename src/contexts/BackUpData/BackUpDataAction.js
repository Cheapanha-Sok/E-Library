import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";

export const getBackUpData = (callback) => {
  const docRef = collection(db, "backUpData");
  const unsubscribe = onSnapshot(
    docRef,
    (docSnap) => {
      const listing = [];
      docSnap.forEach((item) =>
        listing.push({
          bookId: item.id,
          data: item.data(),
        })
      );
      callback(listing);
    },
    (error) => {
      console.log(error);
    }
  );
  return unsubscribe;
};
