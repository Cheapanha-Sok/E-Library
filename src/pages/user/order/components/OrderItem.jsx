export default function OrderItem({ item }) {
  const { title, quantity, price } = item;
  return (
    <li className="border-2 rounded-lg px-2">
      <div className="py-3 flex justify-between items-center font-semibold">
        <div className="flex gap-5">
          <p>{quantity} X </p>
          <p>{title}</p>
        </div>
        <p>${price}</p>
      </div>
    </li>
  );
}
