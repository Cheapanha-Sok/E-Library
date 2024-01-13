import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBook,
  getBookByCategories,
  getBookType,
  getLoading,
  setAllBook,
  setLoading,
} from "./bookCategoriesSlice";
import BookList from "../../../ui/user/BookList.jsx";
import Spinner from "../../../ui/Spinner.jsx";
import DropdownCategories from "./components/DropdownCategories";
import DropdownPrice from "./components/DropdownPrice";
import { getAllBook } from "../../../services/book.api";
import { Link } from "react-router-dom";
import Button from "../../../ui/shared/Button";

const BookCategories = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector(getBook);
  const loading = useSelector(getLoading);
  const bookCategories = useSelector(getBookByCategories)
  const bookType = useSelector(getBookType)


  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = getAllBook((data) => {
      dispatch(setAllBook(data));
    });
    return () => unsubscribe;
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      <Link to="/">
        <Button customClass="bg-[#283d50]">&larr; Back to home</Button>
      </Link>
      <div className="flex flex-col md:flex-row gap-5 justify-end">
        <div className="flex gap-5">
          <DropdownCategories />
          {bookType !== "all_categories" && bookType !== "free" && <DropdownPrice />}
        </div>
      </div>

      {loading ? (
        <Spinner type="full" />
      ) : (
        <BookList data={bookCategories.length ? bookCategories : allBooks} />
      )}
    </div>
  );
};

export default BookCategories;
