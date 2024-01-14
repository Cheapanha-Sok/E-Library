import { useState } from "react";
import { createNewBook } from "../../../../contexts/Books/BookStoreAction.js";
import Modal from "../../../../ui/shared/Modal.jsx";
import Input from "../../../../ui/shared/Input.jsx";
import Button from "../../../../ui/shared/Button.jsx";

export default function AddBook({ onClose, name }) {
  const initialState = {
    title: "",
    description: "",
    price: 0,
    categories: "",
    author: "",
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
    await createNewBook(inputData);
    resetForm();
  };

  return (
    <Modal onClose={onClose} title="Create Book">
      <form onSubmit={handleSubmit} className="p-4 md:p-5 space-y-2 md:space-y-5">
        <div className="flex flex-col gap-2 md:gap-5">
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <label htmlFor="title" className="text-sm font-medium text-white">Title:</label>
            <Input
              type="text"
              style="px-5 py-2 rounded-lg border-2"
              id="title"
              value={inputData.title}
              onChange={onChange}
              required
            />
            <label htmlFor="price" className="text-sm font-medium text-white">Price:</label>
            <Input
              style="px-5 py-2 rounded-lg border-2"
              type="number"
              id="price"
              value={inputData.price}
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
              value={inputData.categories}
              onChange={onChange}
              required
            />
            <label htmlFor="author" className="text-sm font-medium text-white">Author:</label>
            <Input
              style="px-5 py-2 rounded-lg border-2"
              type="text"
              id="author"
              defaultValue={name}
              onChange={onChange}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <label htmlFor="image" className="text-sm font-medium text-white">Image:</label>
            <Input
              style="rounded-lg"
              type="file"
              id="image"
              accept="image/*"
              onChange={onChangeImage}
              required
            />

            <label htmlFor="bookPdf" className="text-sm font-medium text-white">BookPDF:</label>
            <Input
              style="rounded-lg"
              type="file"
              id="bookPdf"
              accept=".pdf"
              onChange={onChangeBookPdf}
              required
            />
          </div>
          <label htmlFor="description" className="block text-sm font-medium text-white text-start">Description:</label>
          <textarea
            className="px-5 py-2 rounded-lg border-2"
            id="description"
            value={inputData.description}
            onChange={onChange}
            required
          ></textarea>

        </div>
        <div>
          <Button
            type="submit"
            customClass="bg-white text-[#283d50] "
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}
