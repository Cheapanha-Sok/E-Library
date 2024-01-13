import { Link } from "react-router-dom";
import Button from "../../../../ui/shared/Button";
import { removeUserBook } from "../../../../services/userBook.api";

export default function BookUserItem({ data }) {
  const { image, title, bookId, categories } = data;

  const removeBookFromUser = async (e) => {
    e.preventDefault();
    await removeUserBook(bookId);
  };
  return (
    <li className="flex flex-col gap-5 shadow-2xl rounded-xl p-5">
      <div className="flex gap-5 flex-col md:flex-row justify-between text-md">
        <div className="flex justify-center items-center gap-5">
          <img
            className="w-[100px] md:w-[150px] border-2 p-2 md:p-5 rounded-xl"
            src={image}
            alt="bookImage"
          />
          <div className="space-y-2">
            <p className="text-lg truncate block capitalize">{title}</p>
            <p className="text-gray-500 uppercase text-xs">{categories}</p>
          </div>
        </div>

        <div className="flex md:flex-col gap-5 justify-end md:justify-center">
          <Link to={`/readBook/${bookId}`}>
            <Button customClass="bg-[#283d50]">Read now</Button>
          </Link>
          <Button onClick={removeBookFromUser} customClass="bg-red-500">
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
