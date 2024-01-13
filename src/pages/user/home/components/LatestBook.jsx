import BookList from '../../../../ui/user/BookList';
import { useSelector } from 'react-redux';
import { getLatestBook } from '../homeSlice';

export default function LatestBook() {
  const popularBook = useSelector(getLatestBook);
  return (
    <div>
      <p className="text-3xl font-semibold py-5">Latest Book</p>
      <BookList data={popularBook} />
    </div>
  );
}
