import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, setBookList, setLoading } from "../searchSlice";
import { getAllBook } from "../../../../services/book.api.js";
import SearchItem from "./SearchItem";
import Spinner from "../../../../ui/Spinner.jsx";

const SearchList = ({ searchResult, onClose }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = getAllBook((data) => {
      dispatch(setBookList(data));
    });
    return () => unsubscribe;
  }, [dispatch]);

  const books = useSelector(getAllBooks);
  const loading = useSelector((state) => state.search.loading);

  const filteredData = books.filter(
    (item) =>
      item.title.toLowerCase().includes(searchResult.toLowerCase()) ||
      item.author.toLowerCase().includes(searchResult.toLowerCase())
  );

  return (
    <div className="text-sm md:text-lg h-[400px] overflow-y-auto shadow-2xl rounded-xl bg-white z-30">
      {loading ? (
        <Spinner />
      ) : (
        <ul>
          {filteredData.length > 0 ? (
            searchResult === "" ? (
              <p className="flex justify-center pt-5">
                Please search for a result.
              </p>
            ) : (
              <SearchItem book={filteredData} onClose={onClose} />
            )
          ) : (
            <p className="flex justify-center pt-5">No books found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchList;
