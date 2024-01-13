import { useEffect } from "react";
import BookList from "../../../ui/user/BookList.jsx";
import { getBookByCategories } from "../../../services/book.api";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesBook, setCurrentCategories, setLoading } from "./bookSlice";
import { useParams } from "react-router-dom";

export default function SimilarBook() {
  const dispatch = useDispatch();
  const { categories } = useParams();
  useEffect(() => {
    const getCurrentCategories = async () => {
      const data = await getBookByCategories(categories);
      dispatch(setCurrentCategories(data));
    };
    getCurrentCategories().then(() => dispatch(setLoading(false)));
  }, [dispatch, categories]);
  const data = useSelector(getCategoriesBook);
  return <BookList data={data} slice={4} />;
}
