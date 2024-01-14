import { useState } from 'react'
import UpdateInfo from "../components/UpdateInfo"
import UpdateImageAndPdf from "../components/UpdateImageAndPdf"
import Modal from "../../../../ui/shared/Modal.jsx";
import Button from '../../../../ui/shared/Button.jsx';

export default function SwicthUpdate({ onClose, bookData, bookId }) {
    const [updateOption, setUpdateOption] = useState("Edit Info")
    let updateToShow = null

    switch (updateOption) {
        case "Edit Info":
            updateToShow = (
                <UpdateInfo bookData={bookData} bookId={bookId} />
            );
            break;
        case "Edit Image and Pdf":
            updateToShow = (
                <UpdateImageAndPdf bookData={bookData} bookId={bookId} />
            )
            break;
        default:
            break;
    }
    return (
        <Modal title="Update Book" onClose={onClose}
            content={<div className='flex flex-row gap-2 text-white'>
                <Button onClick={() => setUpdateOption("Edit Info")}>
                    Update info
                </Button>
                <Button onClick={() => setUpdateOption("Edit Image and Pdf")}>
                    Update image and pdf
                </Button>
            </div>}>
            <div className="flex-grow px-4 py-3 transition duration-150 ease-in-out">
                {updateToShow}
            </div>
        </Modal>


    )
}