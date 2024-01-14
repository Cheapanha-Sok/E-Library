import { useState } from 'react'
import {updateBookInfo} from "../../../../contexts/Books/BookStoreAction.js";
import Input from '../../../../ui/shared/Input.jsx';
import Button from '../../../../ui/shared/Button.jsx';

export default function UpdateInfo({ bookData, bookId }) {
    const { title, categories, price, author, description } = bookData;

    const initialState = {
        title: "",
        description: "",
        price: 0,
        categories: "",
        author: "",
    };
    const [inputData, setInputData] = useState(initialState);

    const onChange = (e) => {
        setInputData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const resetForm = () => {
        setInputData(initialState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateBookInfo(inputData, bookId);
        resetForm();

    };
    return (
        <form onSubmit={handleSubmit} className="p-4 md:p-5 space-y-2 md:space-y-5">
            <div className="flex flex-col gap-2 md:gap-5 ">
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                    <label htmlFor="title" className="text-sm font-medium text-white">Title:</label>
                    <Input
                        type="text"
                        style="px-5 py-2 rounded-lg border-2"
                        id="title"
                        defaultValue={title}
                        onChange={onChange}
                        required
                    />
                    <label htmlFor="price" className="text-sm font-medium text-white">Price:</label>
                    <Input
                        style="px-5 py-2 rounded-lg border-2"
                        type="number"
                        id="price"
                        defaultValue={price}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                    <label htmlFor="categories" className="text-sm font-medium text-white">Categories:</label>
                    <Input
                        style="px-5 py-2 rounded-lg border-2"
                        type="text"
                        id="categories"
                        defaultValue={categories}
                        onChange={onChange}
                        required
                    />
                    <label htmlFor="author" className="text-sm font-medium text-white">Author:</label>
                    <Input
                        style="px-5 py-2 rounded-lg border-2"
                        type="text"
                        id="author"
                        defaultValue={author}
                        onChange={onChange}
                        required
                    />
                </div>

                <label htmlFor="description" className="block text-sm font-medium text-white text-start">Description:</label>
                <textarea
                    className="px-5 py-2 rounded-lg border-2"
                    id="description"
                    defaultValue={description}
                    onChange={onChange}
                    required
                ></textarea>
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
