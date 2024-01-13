import React, { useState } from 'react'
import ShowItem from './ShowItem'

export default function OrderItem({ data }) {
    const [isShowItem, setShowItem] = useState(false)
    const handleShowItem = () => {
        setShowItem(!isShowItem)
    }
    const { checkOutPrice, email, items, orderAt, phoneNumber, userId } = data
    console.log(items)
    return (
        <li className='p-5'>
            <div className='flex flex-col md:flex-row gap-5 border-2 justify-between items-center p-5'>
                <div className='flex flex-col gap-2'>
                    <p className='text-gray-500'>Email : {email}</p>
                    <p className='text-gray-500'>Check Out Price : ${checkOutPrice}</p>
                    <p className='text-gray-500'>PhoneNumber : {phoneNumber}</p>
                    <p className='text-gray-500'>UserId : {userId}</p>
                    <p className='text-gray-500'>Order At : {orderAt}</p>
                </div>
                <div>
                    <button onClick={handleShowItem} className='p-2 bg-[#283d50] rounded-xl text-white'>Show Item</button>
                </div>
            </div>
            {isShowItem && <ShowItem items={items} onClose={handleShowItem}/>}
        </li>
    )
}
