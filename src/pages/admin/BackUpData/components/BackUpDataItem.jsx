import { removeFromBackUpData } from '../../../../contexts/BackUpData/BackUpDataAction';
import btnRemove from "../../../../asset/svg/remove.svg"
import restore from "../../../../asset/svg/getDataBack.svg"
import { getDataBack } from '../../../../contexts/Books/BookStoreAction';
import Button from '../../../../ui/shared/Button';

export default function BackUpDataItem({ data, bookId, role, name }) {
    const { title, price, description, image, categories, author, bookPdf } = data;
    const handleRemoveBook = async (e) => {
        e.preventDefault()
        await removeFromBackUpData(bookId, true)
    }
    const handleGetDataBack = async (e) => {
        e.preventDefault()
        await getDataBack(bookId, title, price, description, image, categories, author, bookPdf);
    }
    return (
        <li className="flex flex-col border-2 rounded-lg">
            <div className="flex gap-5 flex-col md:flex-row justify-between text-md p-5">
                <div className="flex justify-center items-center gap-5">
                    <img
                        className="w-[100px] md:w-[150px] p-2"
                        src={image}
                        alt="bookImage"
                    />
                    <div className="space-y-1 text-xs">
                        <p className="text-xs sm:text-sm md:text-lg truncate block capitalize">
                            Titile : {title}
                        </p>
                        <p className="text-gray-500 uppercase">Categories : {categories}</p>
                        <p className="text-gray-500 uppercase truncate w-32 md:w-80">
                            Decription : {description}
                        </p>
                        <p className="text-gray-500 uppercase">
                            {price === 0 ? "Free" : `$${price}`}
                        </p>
                        <p className="text-gray-500 uppercase ">Author : {author}</p>
                    </div>

                </div>
                <div className="flex md:flex-col gap-5 justify-end md:justify-center text-xs">
                    {role === "admin" || (role === "author" && name === author) ? <Button customClass="bg-[#283d50] text-white" onClick={handleGetDataBack}>
                        <img src={restore} alt="" className="w-3 md:w-4" />
                        Restore
                    </Button> : null}
                    {role === "admin" || (role === "author" && name === author) ? <Button customClass="bg-red-500 text-white" onClick={handleRemoveBook}>
                        <img src={btnRemove} alt="" className="w-3 md:w-4" />
                        Delete Item
                    </Button> : null}

                </div>

            </div>

        </li>
    )
}
