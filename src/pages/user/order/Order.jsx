import {useDispatch, useSelector} from "react-redux";
import {getListItemFromCart} from "../../../services/cart.api";
import OrderItem from "./components/OrderItem";
import Spinner from "../../../ui/Spinner.jsx";

import {useEffect} from "react";
import {
    getLoading,
    getOrderSummary,
    getTotalPriceOrder,
    setLoading,
    setOrderSummary,
    setTotalPriceOrder,
} from "./orderSlice";
import Payment from "./components/Payment";

const Order = () => {
    const order = useSelector(getOrderSummary);
    const loading = useSelector(getLoading);
    const totalPriceOrder = useSelector(getTotalPriceOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        const unsubscribe = getListItemFromCart((data) => {
            dispatch(setOrderSummary(data.items));
            dispatch(setTotalPriceOrder(data.totalPrice));
        });
        return () => unsubscribe;
    }, [dispatch]);

    return (
        <div className="p-5">
            <div className="flex flex-col gap-5 md:flex-row ">
                <div className="w-full border-2">
                    <div className="flex flex-col py-5 px-5 gap-5">
                        <p className="text-2xl font-bold tracking-tight text-gray-900">
                            Order Summary :
                        </p>
                        {!order.length ? <p>No Items To Checkout</p> : loading ? <Spinner/> :
                            <ul className="flex flex-col gap-5 rounded-3xl">
                                {order.map((item) => (
                                    <OrderItem item={item} key={item.bookId}/>
                                ))}
                            </ul>}
                        {order.length ? <div className="flex justify-between font-semibold text-xl">
                            <p>Total Price:</p>
                            <p>${totalPriceOrder}
                            </p>
                        </div> : null}

                    </div>
                </div>
                <Payment
                    order={order}
                    totalPriceOrder={totalPriceOrder}
                />
            </div>
        </div>
    );
};
export default Order;
