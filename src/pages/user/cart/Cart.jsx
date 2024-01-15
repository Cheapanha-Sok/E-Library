import CartItems from "./components/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListItemFromCart } from "../../../services/cart.api";
import EmptyCart from "../../../asset/image/EmptyCart.png";
import {
  setCartListItem,
  setTotalCartItem,
  setCartTotalPrice,
  setLoading,
  getListProduct,
  getTotalPrice,
  getLoading,
} from "./cartSlice";
import Button from "../../../ui/shared/Button";
import { Link } from "react-router-dom";
import Spinner from "../../../ui/Spinner.jsx";
import Empty from "../../../ui/shared/Empty"

function Cart() {
  const dispatch = useDispatch();
  const listProduct = useSelector(getListProduct);
  const totalPrice = useSelector(getTotalPrice);
  const loadingItem = useSelector(getLoading);
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = getListItemFromCart((data) => {
      dispatch(setCartListItem(data.items));
      dispatch(setCartTotalPrice(data.totalPrice));
      dispatch(setTotalCartItem());
    });
    return () => unsubscribe;
  }, [dispatch]);

  return (
    <div className="px-3 py-3 flex flex-col gap-5">
      <Link to="/">
        <Button customClass="bg-[#283d50] text-white">&larr; Back to home</Button>
      </Link>
      <h2 className="pb-5 pt-5 text-2xl font-semibold">Shopping Cart</h2>
      <ul className="flex flex-col gap-5">
        {!listProduct.length ? (
          <Empty text="Add something to make me happy" image={EmptyCart} />
        ) : loadingItem ? (
            <Spinner isFull={true} />
        ) : (
          listProduct.map((item) => <CartItems item={item} key={item.bookId} />)
        )}
      </ul>
      <div className="flex flex-col md:flex-row justify-between gap-2 items-center py-3">
        {listProduct.length ? <span className="font-semibold text-xl text-end py-2">
          Subtotal : {totalPrice} $
        </span> : null}

        {!listProduct.length ? null : (
          <Link to="/order">
            <Button customClass="bg-[#283d50] text-white">Order Now</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Cart;
