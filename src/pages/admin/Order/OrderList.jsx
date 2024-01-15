import  { useContext, useEffect } from 'react'
import OrderContext from "../../../contexts/Order/OrderContext.jsx";
import {getAllOrder} from "../../../contexts/Order/OrderAction.js";
import Spinner from "../../../ui/Spinner.jsx";
import OrderItem from './components/OrderItem'

export default function OrderList() {
  const { listOrders, dispatch, loading } = useContext(OrderContext)
  useEffect(() => {
    dispatch({ type: "SET_LOADING" })
    const unsubscribe = getAllOrder((data) => {
      dispatch({ type: "GET_ALL_ORDER", payload: data })
    })
    return () => unsubscribe
  }, [dispatch])
  return (
    <>
      {!listOrders.length ? <div className='h-screen flex justify-center items-center md:text-4xl'>No order yet</div> : loading ? <Spinner type="full" /> : <div className='flex-col gap-5'>
        <div className="w-full md:w-1/2 mx-auto">
        </div>
        <ul className='flex-col gap-5 p-5'>
          {listOrders.map((item) => (
            <OrderItem data={item.data} key={item.id} userId={item.id} />
          ))}
        </ul>
      </div>}
    </>
  )
}
