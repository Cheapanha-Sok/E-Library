import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { toast } from "react-toastify";
import { getUserId } from "./user.api";

export const getListItemFromCart = async (callback) => {
  const userRef = doc(db, "carts", auth.currentUser.uid);
  return onSnapshot(
    userRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data());
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

export const removeItemFromCart = async (
  bookId,
  listProduct,
  price,
  totalPrice
) => {
  const userRef = doc(db, "carts", auth.currentUser.uid);
  const filteredItem = listProduct.filter((item) => item.bookId !== bookId);
  const newTotalPrice = totalPrice - price;
  try {
    await setDoc(userRef, {
      items: filteredItem,
      totalPrice: newTotalPrice,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addItemToCart = async (
  bookId,
  title,
  price,
  image,
  categories
) => {
  try {
    const userId = await getUserId();
    if (userId !== null) {
      const userRef = doc(db, "carts", auth.currentUser.uid);
      const cartSnapshot = await getDoc(userRef);
      const currentCartData = cartSnapshot.exists()
        ? cartSnapshot.data()
        : { items: [], totalPrice: 0 };

      const existingItemIndex = currentCartData.items.findIndex(
        (item) => item.bookId === bookId
      );

      if (existingItemIndex === -1) {
        const updatedItems = [
          ...currentCartData.items,
          {
            bookId,
            title,
            price,
            image,
            categories,
          },
        ];

        const totalPrice = currentCartData.totalPrice + price;
        await setDoc(userRef, { items: updatedItems, totalPrice });
        toast.success("Item added to cart");
      } else {
        toast.warning("Item already in cart");
      }
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error in addItemToCart:", error);
  }
};

export const removeAllItemFromCart = async () => {
  const userRef = doc(db, "carts", auth.currentUser.uid);
  const emptyItem = [];
  const totalPrice = 0;
  try {
    await setDoc(userRef, { items: emptyItem, totalPrice });
  } catch (error) {
    console.log(error);
  }
};
