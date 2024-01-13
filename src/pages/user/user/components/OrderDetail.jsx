import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoading, getOrder, setLoading, setOrder } from '../userSlice'
import { getUserOrder } from '../../../../services/user.api'
import Spinner from '../../../../ui/Spinner.jsx';
import OrderItem from './OrderItem';

export default function OrderDetail() {
    const dispatch = useDispatch();
    const listsOrder = useSelector(getOrder)
    const loading = useSelector(getLoading)
    useEffect(() => {
        dispatch(setLoading(true))
        const unsubcribe = getUserOrder((data) => {
            dispatch(setOrder(data))
        })
        return () => unsubcribe
    }, [dispatch])
    const { totalOrder, orders } = listsOrder
    return (
        <div className='border-2 rounded-xl w-full md:w-1/2'>
            {loading ? (<Spinner />) : (
                <div className='flex flex-col justify-between p-5'>
                    <div className="flex justify-between items-center">
                        <span className="text-sm md:text-xl font-bold tracking-tight text-gray-900">
                            Order History
                        </span>
                        <span className="text-sm md:text-xl font-bold tracking-tight text-gray-900">
                            Total Order : {totalOrder}
                        </span>

                    </div>
                    <hr className="h-px my-5 bg-gray-500" />
                    <OrderItem orders={orders} />
                </div>
            )}
        </div>
    )
}
