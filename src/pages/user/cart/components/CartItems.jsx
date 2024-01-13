import DeleteCart from "./DeleteCart";

export default function CartItems({ item }) {
  const { title, image, categories, price ,bookId} = item;
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
          <DeleteCart bookId={bookId} price={price} />
        </div>
        <div className="flex flex-col gap-5 justify-center">
          <p className="text-end">${price}</p>
        </div>
      </div>
    </li>
  );
}
