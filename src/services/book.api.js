import { db } from "../firebase.config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";

export const getAllBook = (callback) => {
  const docRef = collection(db, "books");
  const unsubscribe = onSnapshot(
    docRef,
    (docSnap) => {
      const listing = [];
      docSnap.forEach((item) =>
        listing.push({ bookId: item.id, ...item.data() })
      );
      callback(listing);
    },
    (error) => {
      console.log(error);
    }
  );
  return unsubscribe;
};
export async function getCurrentBook(bookId) {
  try {
    const docRef = doc(db, "books", bookId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dataWithId = { bookId: docSnap.id, ...docSnap.data() };
      return dataWithId;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error.message);
  }
}
export const getBookByCategories = async (categories) => {
  try {
    const bookRef = collection(db, "books");
    const q = query(bookRef, where("categories", "==", categories));
    const querySnapshot = await getDocs(q);
    const data = [];

    querySnapshot.forEach((doc) => {
      const docDataWithId = { bookId: doc.id, ...doc.data() };
      data.push(docDataWithId);
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};