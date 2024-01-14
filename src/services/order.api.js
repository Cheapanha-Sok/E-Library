import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { toast } from "react-toastify";
import { removeAllItemFromCart } from "./cart.api";
import { isInBookMark } from "./userBook.api";
export const checkOut = async (cart, totalPriceOrder, email, phoneNumber) => {
  try {
    const ordersCollectionRef = collection(db, "orders");
    const currentDate = new Date();
    const options = {
      timeZone: "Asia/Phnom_Penh",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const formattedDate = currentDate.toLocaleString("en-US", options);
    const userId = auth.currentUser.uid;

    const itemsArray = cart.map((cartItem) => ({
      bookId: cartItem.bookId,
      price: cartItem.price,
    }));

    await addDoc(ordersCollectionRef, {
      items: itemsArray,
      checkOutPrice: totalPriceOrder,
      orderAt: formattedDate,
      userId,
      email,
      phoneNumber,
    });
    for (const cartItem of cart) {
      await isBoughtBook(cartItem.bookId);
      await setOrderHistory(
        cartItem.bookId,
        cartItem.title,
        cartItem.price,
        cartItem.categories,
        formattedDate
      );
    }

    await addBooksToUserAfterPay(cart);
    toast.success("Payment successful!");
    return true;
  } catch (error) {
    console.error("Error during checkout:", error);
  }
};

export const addBooksToUserAfterPay = async (item) => {
  try {
    const userRef = doc(db, "userBooks", auth.currentUser.uid);
    const userSnapshot = await getDoc(userRef);
    const currentUserData = userSnapshot.exists()
      ? userSnapshot.data()
      : { books: [] };

    for (const cartItem of item) {
      const { bookId, image, title, categories } = cartItem;
      const existingItemIndex = await isInBookMark(bookId);

      if (existingItemIndex === -1) {
        currentUserData.books.push({
          bookId,
          title,
          image,
          categories,
        });
      }
    }

    await setDoc(userRef, currentUserData);
    await removeAllItemFromCart();
  } catch (error) {
    console.error(error);
  }
};

export const isBoughtBook = async (bookId) => {
  try {
    const docRef = doc(db, "books", bookId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentIsBought = docSnap.data().isBought || 0;
      const newIsBought = currentIsBought + 1;

      await setDoc(docRef, {
        ...docSnap.data(),
        isBought: newIsBought,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const setOrderHistory = async (
  bookId,
  title,
  price,
  categories,
  formattedDate
) => {
  try {
    const userRef = doc(db, "orderHistory", auth.currentUser.uid);
    const orderSnapshot = await getDoc(userRef);
    const currentOrderData = orderSnapshot.exists()
      ? orderSnapshot.data()
      : { orders: [], totalOrder: 0 };

    const updatedItems = [
      ...currentOrderData.orders,
      {
        bookId,
        title,
        price,
        categories,
        formattedDate,
      },
    ];
    const totalOrder = currentOrderData.totalOrder + 1;
    await setDoc(userRef, { orders: updatedItems, totalOrder });
  } catch (error) {
    console.log(error);
  }
};
