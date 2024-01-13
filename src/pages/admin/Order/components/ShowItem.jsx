import React from 'react'
import Modal from "../../../../ui/shared/Modal.jsx";

export default function ShowItem({ items, onClose }) {

    return (
        <Modal onClose={onClose} title="Summary Item">
            {items.map((item) => (
                <li key={item.bookId} className='flex flex-col gap-5 text-white p-5'>
                    <div className='flex flex-col border-2 p-5 rounded-lg'>
                        <p>Book Id: {item.bookId}</p>
                        <p>Unitprice : ${item.price}</p>
                    </div>

                </li>
            ))}
        </Modal>
    )
}
