import { Link } from "react-router-dom";
import PropTypes from "prop-types"
export default function BookItem({ book }) {
  const { bookId, title, categories, price, image, description} = book;
  return (
    <div className="w-full bg-white shadow-md border-gray-200 md:duration-500 md:hover:scale-105 md:hover:shadow-xl ">
      <Link to={`/book/${categories}/${bookId}`}>
        <div className="bg-gradient-to-r from-white to-[#283d50] p-5 md:p-10 rounded-t-lg">
          <img src={image} alt="bookimg" className="h-[130px] w-[80%] md:h-[220px] mx-auto" />
        </div>

        <div className="flex flex-col gap-1 p-2">
          <p className="text-gray-500 uppercase text-xs">{categories}</p>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {title}
          </p>
          <p className="mb-3 font-normal text-gray-700 truncate block capitalize">
            {description}
          </p>
          <p className="text-sm font-semibold text-black">
            {price ? `${price}$` : "Free"}
          </p>
        </div>
      </Link>
    </div>
  );
}
BookItem.propTypes = {
  book: PropTypes.object
}

