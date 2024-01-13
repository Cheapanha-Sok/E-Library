import { removeItemFromCart } from "../../../../services/cart.api";
import Button from "../../../../ui/shared/Button";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../cartSlice.js";

export default function DeleteCart({ bookId,price }) {
  const listProduct = useSelector((state) => state.cart.cartListItem);
  const totalPrice = useSelector(getTotalPrice);

  const deleteCart = async (e) => {
    e.preventDefault();
    await removeItemFromCart(bookId, listProduct, price, totalPrice);
  };

  return (
    <Button
      type="button"
      customClass="bg-red-500 text-white"
      onClick={deleteCart}
    >
      Delete
    </Button>
  );
}
