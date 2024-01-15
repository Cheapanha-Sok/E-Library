import { useEffect } from "react";
import {getCurrentBook} from "../../../services/book.api.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isInBookMark } from "../../../services/userBook.api";
import { getBook, getLoading, isTrue, setCurrentBook } from "./readBookSlice";
import Spinner from "../../../ui/Spinner.jsx";
import { setLoading } from "./readBookSlice";
import Empty from "../../../ui/shared/Empty";

export default function ReadBook() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      const isBookmarked = await isInBookMark(id);
      if (!isBookmarked) {
        const data = await getCurrentBook(id);
        dispatch(setCurrentBook(data));
      }
    };
    fetchData().then(() => dispatch(setLoading(false)));
  }, [dispatch, id]);

  const { bookPdf } = useSelector(getBook);
  const loading = useSelector(getLoading);
  const isBookMark = useSelector(isTrue);
  return (
    <div className="h-screen py-5">
      {loading ? (
        <Spinner isFull={true} />
      ) : isBookMark ? (
        <iframe src={bookPdf} height="100%" width="100%"></iframe>
      ) : (
        <Empty />
      )}
    </div>
  );
}
