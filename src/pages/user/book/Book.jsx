import { useEffect } from "react";
import Button from "../../../ui/shared/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBook, setLoading, getBook } from "./bookSlice";
import { addItemToCart } from "../../../services/cart.api";
import { getCurrentBook } from "../../../services/book.api";
import SimilarBook from "./SimilarBook";
import Spinner from "../../../ui/Spinner.jsx";
import { addBooksToBookMark } from "../../../services/userBook.api";

export default function Book() {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.currentBook.loading);

  useEffect(() => {
    dispatch(setLoading(true));
    const getCurrentBookData = async () => {
      const data = await getCurrentBook(paramId);
      dispatch(setCurrentBook(data));
    };
    getCurrentBookData().then(() => dispatch(setLoading(false)));
  }, [dispatch, paramId]);

  const { bookId, title, price, author, image, categories } =
    useSelector(getBook);
  const handleAddToCart = async (e) => {
    e.preventDefault();
    const response = await addItemToCart(
      bookId,
      title,
      price,
      image,
      categories
    );
    if (response) {
      navigate("/authentication");
    }
  };
  const handelAddtoBookStore = async (e) => {
    e.preventDefault();
    const status = await addBooksToBookMark(bookId, title, image, categories);
    if (status) {
      navigate("/authentication");
    }
  };
  return (
    <>
      {loading ? (
        <Spinner type="full" />
      ) : (
        <div className="flex flex-col gap-10 py-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-[250px] h-[300px] md:w-[500px] overflow-hidden p-5 md:p-0 mx-auto ">
              <img
                src={image}
                alt="bookimg"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col px-5 gap-4">
              <div className="font-semibold text-md md:text-xl space-y-2 ">
                <p className="md:text-3xl">Tittle : {title} </p>
                <p>Author : {author} </p>
                {price !== 0 ? (
                  <p className="text-green-500">Price : ${price}</p>
                ) : (
                  <p className="text-green-500">Free</p>
                )}
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates quibusdam soluta eveniet, sit rem eligendi ut
                  nesciunt maxime a sint sunt vitae ipsa, nostrum quo voluptatum
                  reprehenderit cum magnam modi?
                </p>
              </div>
              <div className="flex flex-col gap-5 md:w-1/4">
                {price !== 0 ? (
                  <Button
                    customClass=" bg-[#283d50] text-white"
                    onClick={handleAddToCart}
                    type="button"
                  >
                    Add To Cart
                  </Button>
                ) : (
                  <Button
                    customClass=" bg-[#283d50] text-white"
                    type="button"
                    onClick={handelAddtoBookStore}
                  >
                    Add to Book Mark
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="text-md md:text-3xl font-semibold space-y-5 px-5 md:px-0">
            <span>Similar to this Book </span>
            <SimilarBook />
          </div>
        </div>
      )}
    </>
  );
}
