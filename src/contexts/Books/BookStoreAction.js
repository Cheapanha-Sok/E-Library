import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, getDataStorage } from "../../firebase.config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify";
import {
  addToBackUpData,
  removeFromBackUpData,
} from "../BackUpData/BackUpDataAction";

export const getAllProduct = (callback) => {
  const docRef = collection(db, "books");
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
export const createNewBook = async (book) => {
  try {
    const bookRef = collection(db, "books");
    const { title, description, price, image, bookPdf, author, categories } =
      book;

    const docRef = await addDoc(bookRef, {
      title,
      description,
      price: parseFloat(price),
      author,
      categories,
      image: "",
      bookPdf: "",
    });

    const imageRef = ref(getDataStorage, `books/bookImage/${docRef.id}`);
    const pdfRef = ref(getDataStorage, `books/bookPdf/${docRef.id}`);

    await uploadBytes(imageRef, image);
    await uploadBytes(pdfRef, bookPdf);

    const imageUrl = await getDownloadURL(imageRef);
    const pdfUrl = await getDownloadURL(pdfRef);

    await updateDoc(docRef, {
      image: imageUrl,
      bookPdf: pdfUrl,
    });

    toast.success("Book added successfully");
  } catch (error) {
    console.log(error);
    toast.success("Book added failed");
  }
};

export const updateBookInfo = async (bookData, bookId) => {
  try {
    const { title, description, price, date, author, categories } = bookData;
    const docRef = doc(db, "books", bookId);
    if (title) {
      await updateDoc(docRef, {
        title,
      });
    }
    if (description) {
      await updateDoc(docRef, {
        description,
      });
    }
    if (price) {
      await updateDoc(docRef, {
        price: parseFloat(price),
      });
    }
    if (date) {
      await updateDoc(docRef, {
        date,
      });
    }
    if (author) {
      await updateDoc(docRef, {
        author,
      });
    }
    if (categories) {
      await updateDoc(docRef, {
        categories,
      });
    }

    toast.success("Book updated successfully");
  } catch (error) {
    toast.error("Error updating book:", error);
  }
};

export const updateBookImageAndPdf = async (bookData, bookId) => {
  try {
    const docRef = doc(db, "books", bookId);
    const { image, bookPdf } = bookData;
    if (image) {
      const bookImgRef = ref(getDataStorage, `books/bookImage/${bookId}`);
      await uploadBytes(bookImgRef, image);
      const imageUrl = await getDownloadURL(bookImgRef);
      await updateDoc(docRef, {
        image: imageUrl,
      });
    }
    if (bookPdf) {
      const bookPdfRef = ref(getDataStorage, `books/bookPdf/${bookId}`);
      await uploadBytes(bookPdfRef, bookPdf);
      const pdfUrl = await getDownloadURL(bookPdfRef);
      await updateDoc(docRef, {
        bookPdf: pdfUrl,
      });
    }
    toast.success("Bookupdated successfully");
  } catch (error) {
    console.log(error);
    toast.error("Error updating book:", error);
  }
};
export const removeBook = async (bookId) => {
  try {
    const bookRef = doc(db, "books", bookId);
    const bookData = await getDoc(bookRef);
    const response = await addToBackUpData(bookId, bookData.data());
    if (response) {
      await deleteDoc(bookRef);
      toast.success("Remove Book Success");
    }
  } catch (error) {
    console.log(error);
    toast.error("Something when wrong");
  }
};
export const getDataBack = async (
  bookId,
  title,
  price,
  description,
  image,
  categories,
  author,
  bookPdf
) => {
  try {
    const bookRef = doc(db, "books", bookId);
    await setDoc(bookRef, {
      title,
      description,
      price: parseFloat(price),
      author,
      categories,
      image,
      bookPdf,
    });
    toast.success("Restore book success")
    await removeFromBackUpData(bookId , false);
  } catch (error) {
    console.log(error);
  }
};
export const calculateBookFree = (listBooks) => {
  const typeCount = {
    free: 0,
  };
  listBooks.forEach((product) => {
    const type = product.data.price === 0 ? "free" : "notFree";
    if (type in typeCount) {
      typeCount[type]++;
    }
  });
  return typeCount;
};

export const calculateNumberOfBook = (listProduct) => {
  const typeCount = {
    comic: 0,
    study: 0,
    comdy: 0,
    horror: 0,
    novel: 0,
    all_book: 0,
  };
  listProduct.forEach((product) => {
    const type = product.data.categories.toLowerCase();
    if (type in typeCount) {
      typeCount[type]++;
      typeCount.all_book++;
    }
  });
  return typeCount;
};
export const calculateBookOfEachAuthor = (listProduct) => {
  const typeCount = {
    panha: 0,
    dom: 0,
    dara: 0,
    sak: 0,
  };
  listProduct.forEach((product) => {
    const type = product.data.author.toLowerCase();
    if (type in typeCount) {
      typeCount[type]++;
    }
  });
  return typeCount;
};
