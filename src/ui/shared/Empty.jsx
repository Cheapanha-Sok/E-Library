export default function Empty({ text , image }) {
  return (
    <div className="flex flex-col justify-center items-center font-semibol text-xl gap-5">
      <img src={image} alt="emptyBox" className="w-1/2 md:w-1/5" />
      <p className="text-black font-semibold text-sm md:text-xl">{text}</p>
    </div>
  );
}
