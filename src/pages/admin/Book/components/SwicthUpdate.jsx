import {useState} from 'react'
import UpdateInfo from "../components/UpdateInfo"
import UpdateImageAndPdf from "../components/UpdateImageAndPdf"
import closeModal from "../../../../asset/svg/closeModal.svg"
import Modal from "../../../../ui/shared/Modal.jsx";

export default function SwicthUpdate({onClose, bookData, bookId}) {
    const [updateOption, setUpdateOption] = useState("Edit Info")
    let updateToShow = null

    switch (updateOption) {
        case "Edit Info":
            updateToShow = (
                <UpdateInfo bookData={bookData} bookId={bookId}/>
            );
            break;
        case "Edit Image and Pdf":
            updateToShow = (
                <UpdateImageAndPdf bookData={bookData} bookId={bookId}/>
            )
            break;
        default:
            break;
    }
    return (
        <Modal title="Update Book" onClose={onClose}
               content={<div className='flex flex-row gap-2 text-white'>
                            <span onClick={() => setUpdateOption("Edit Info")} className='cursor-pointer'>
                                Update info
                            </span>
                   <span onClick={() => setUpdateOption("Edit Image and Pdf")} className='cursor-pointer'>
                                Update image and pdf
                            </span>
               </div>}>

            <div className="flex-grow px-4 py-3 transition duration-150 ease-in-out">
                {updateToShow}
            </div>
        </Modal>


    )
}