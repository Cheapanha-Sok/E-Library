import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyBook from "../../../asset/image/EmptyBook.png";
import {
  getAllBooks,
  getloading,
  setBooklist,
  setLoading,
} from "./bookUserSlice";
import { getUserBook } from "../../../services/userBook.api";
import Spinner from "../../../ui/Spinner.jsx";
import BookUserItem from "./components/BookUserItem";
import Empty from "../../../ui/shared/Empty"
import { Link } from "react-router-dom";
import Button from "../../../ui/shared/Button";

export default function BookUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = getUserBook((data) => {
      dispatch(setBooklist(data.books));
    });
    return () => unsubscribe;
  }, [dispatch]);

  const data = useSelector(getAllBooks);
  const loading = useSelector(getloading);
  return (
    <div className="py-5 px-5 h-full flex flex-col gap-5">
      <Link to="/">
        <Button customClass="bg-[#283d50] text-white">&larr; Back to home</Button>
      </Link>
      {!data.length ? (
        <Empty text="Add some book to read" image={EmptyBook} />
      ) : loading ? (
          <Spinner isFull={true} />
      ) : (
        <ul className="flex flex-col gap-5">
          {data.map((book) => (
            <BookUserItem data={book} key={book.bookId} />
          ))}
        </ul>
      )}
    </div>
  );
}
