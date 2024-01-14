import { useState } from 'react'
import { updateBookImageAndPdf } from "../../../../contexts/Books/BookStoreAction.js";
import Input from '../../../../ui/shared/Input.jsx';
import Button from '../../../../ui/shared/Button.jsx';

export default function UpdateImageAndPdf({ bookData, bookId }) {
    const { image, bookPdf } = bookData;
    const initialState = {
        image: null,
        bookPdf: null,
    };
    const [inputData, setInputData] = useState(initialState);

    const onChangeImage = (e) => {
        setInputData((prevState) => ({
            ...prevState,
            image: e.target.files[0],
        }));
    };

    const onChangeBookPdf = (e) => {
        setInputData((prevState) => ({
            ...prevState,
            bookPdf: e.target.files[0],
        }));
    };
    const resetForm = () => {
        setInputData(initialState);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateBookImageAndPdf(inputData, bookId);
        resetForm();
    };
    return (
        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 ">
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="space-y-2">
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-900 dark:text-white"
                        >
                            BookImage:
                        </label>
                        <Input
                            style="rounded-lg"
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={onChangeImage}
                        />
                    </div>
                    <img src={image} alt="" className="w-[100px] h-[150px] md:w-[150px] md:h-[200px]" />

                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="space-y-2">
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-900 dark:text-white"
                        >
                            BoookPdf:
                        </label>
                        <Input
                            style="rounded-lg"
                            type="file"
                            id="bookPdf"
                            accept=".pdf"
                            onChange={onChangeBookPdf}
                        />

                    </div>
                    <iframe src={bookPdf} className="w-[100px] h-[150px] md:w-[150px] md:h-[200px]" ></iframe>

                </div>
            </div>
            <Button
                type="submit"
                customClass=" bg-white  text-[#283d50]"
            >
                Update
            </Button>
        </form>
    )
}
