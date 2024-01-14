import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, getDataStorage } from "../../firebase.config";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";

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
export const addToBackUpData = async (bookId, bookData) => {
  try {
    const { author, categories, description, price, title, image, bookPdf } =
      bookData;
    const backUpRef = doc(db, "backUpData", bookId);

    await setDoc(backUpRef, {
      title,
      categories,
      author,
      description,
      price,
      image,
      bookPdf,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};
export const removeFromBackUpData = async (bookId, isRemove) => {
  try {
    const backUpDataRef = doc(db, "backUpData", bookId);
    const bookImgRef = ref(getDataStorage, `books/bookImage/${bookId}`);
    const bookPdfRef = ref(getDataStorage, `books/bookPdf/${bookId}`);
    if (isRemove) {
      await deleteObject(bookImgRef);
      await deleteObject(bookPdfRef);
      toast.success("Remove from backup data success");
    }

    await deleteDoc(backUpDataRef);
  } catch (error) {
    console.log(error);
  }
};
