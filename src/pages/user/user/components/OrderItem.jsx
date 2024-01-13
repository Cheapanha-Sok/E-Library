import React from 'react';

export default function OrderItem({ orders }) {
    return (
        <ul className='flex flex-col gap-5 overflow-y-auto h-52'>
            {!orders ? (
                <p>Buy something to make me happy</p>
            ) : (
                orders.map((order, index) => (
                    <li key={index} className='flex gap-2 border-2 p-2 rounded-lg justify-between'>
                        <div>
                            <p>Title: {order.title}</p>
                            <p>{order.categories}</p>
                        </div>

                        <p>Price: ${order.price}</p>
                    </li>
                ))
            )}
        </ul>
    );
}
