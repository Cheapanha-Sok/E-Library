import BookItem from "./BookItem";

export default function BookList({ data, slice }) {
  let displayedItems = data;

  if (slice) {
    const random_boolean = Math.random() < 0.5;
    displayedItems = random_boolean
      ? data.slice().reverse().slice(0, slice)
      : data.slice(0, slice);
  }

  return (
    <>
      <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 text-sm md:text-l">
        {displayedItems.map((item) => (
          <BookItem book={item} key={item.bookId} />
        ))}
      </div>
    </>
  );
}
