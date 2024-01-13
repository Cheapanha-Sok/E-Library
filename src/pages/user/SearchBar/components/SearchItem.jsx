import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SearchItem = ({ book, onClose }) => (
  <>
    {book.map((item) => (
      <li key={item.bookId} className="bg-slate-200 text-black">
        <Link to={`/book/${item.categories}/${item.bookId}`} onClick={onClose}>
          <div className="flex gap-10 p-5">
            <div className="w-[70px] md:w-[150px]">
              <img src={item.image} alt="image" />
            </div>
            <div className="flex flex-col md:gap-2 text-black text-sm md:text-xl md:font-semibold">
              <span>Title : {item.title}</span>
              <span>Author : {item.author}</span>
              <span>Categories : {item.categories}</span>
              <span className="flex gap-1">
                Price :
                <p className="text-green-500">
                  {item.price ? `$${item.price}` : "Free"}
                </p>
              </span>
            </div>
          </div>
        </Link>
      </li>
    ))}
  </>
);

SearchItem.propTypes = {
  book: PropTypes.array
};

export default SearchItem;
