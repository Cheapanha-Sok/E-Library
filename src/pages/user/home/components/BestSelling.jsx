import BookList from "../../../../ui/user/BookList";
import { getPopularBooks } from "../homeSlice";
import { useSelector } from "react-redux";

export default function BestSelling() {
    const popularBook = useSelector(getPopularBooks);
    if(!popularBook.length){
        return null
    }

    return (
        <div>
            <p className="text-3xl font-semibold py-5">Popular Book</p>
            <BookList data={popularBook} />
        </div>
    );
}
