import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../ui/Spinner.jsx";
import BestSelling from "./components/BestSelling.jsx";
import { useEffect } from "react";
import {
  getLoading,
  setBestSelling,
  setBookList,
  setLatestBook,
  setLoading,
  setPopularBook,
} from "./homeSlice.js";
import { Link } from "react-router-dom";
import Button from "../../../ui/shared/Button.jsx";
import LatestBook from "./components/LatestBook.jsx";
import {getAllBook} from "../../../services/book.api.js";
import HeroSection from "./components/HeroSection.jsx";

export default function Homepage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = getAllBook((data) => {
      dispatch(setBookList(data));
      dispatch(setPopularBook());
      dispatch(setLatestBook());
      dispatch(setBestSelling());
    });
    return () => unsubscribe;
  }, [dispatch]);

  const loading = useSelector(getLoading);

  return (
    <>
      {loading ? (
        <Spinner isFull={true} />
      ) : (
        <section>
          <div className="space-y-10 p-5">
            <HeroSection />
              <Button customClass="bg-[#283d50] text-white">
              <Link to="/bookCategories">Choose book by categories</Link>
            </Button>
            <LatestBook />
            <BestSelling />
          </div>
        </section>

      )}
    </>
  );
}
