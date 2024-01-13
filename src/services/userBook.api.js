import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { getUserId } from "./user.api";
import { toast } from "react-toastify";

export const getUserBook = async (callback) => {
  try {
    const docRef = doc(db, "userBooks", auth.currentUser.uid);
    return onSnapshot(
      docRef,
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
    console.error(error);
  }
};

export const removeUserBook = async (bookId) => {
  try {
    const docRef = doc(db, "userBooks", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    const newData = docSnap.data().books.filter((item) => {
      return item.bookId !== bookId;
    });

    await setDoc(docRef, { books: newData });
    return newData;
  } catch (error) {
    console.log(error);
  }
};
export const addBooksToBookMark = async (bookId, title, image, categories) => {
  try {
    const userId = await getUserId();
    if (userId !== null) {
      const userRef = doc(db, "userBooks", auth.currentUser.uid);
      const userBookSnapshot = await getDoc(userRef);
      const currentCartData = userBookSnapshot.exists()
        ? userBookSnapshot.data()
        : { books: [] };

      const existingItemIndex = currentCartData.books.findIndex(
        (item) => item.bookId === bookId
      );

      if (existingItemIndex === -1) {
        const updatedItems = [
          ...currentCartData.books,
          {
            bookId,
            title,
            image,
            categories,
          },
        ];

        await setDoc(userRef, { books: updatedItems });
        toast.success("Book added to bookmark");
      } else {
        toast.warning("Book already in bookmark");
      }
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const isInBookMark = async (bookId) => {
  try {
    const userRef = doc(db, "userBooks", auth.currentUser.uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const existingItemIndex = userSnapshot
        .data()
        .books.findIndex((item) => item.bookId === bookId);

      return existingItemIndex;
    }

    return -1;
  } catch (error) {
    console.error(error);
    return -1;
  }
};
