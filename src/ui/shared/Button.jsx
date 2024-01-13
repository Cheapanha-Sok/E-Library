function Button({ children, onClick, customClass, type }) {
  const defaultClass =
    "rounded-xl px-4 py-2 font-semibold text-white text-xs md:text-auto";
  const buttonClass = customClass
    ? `${defaultClass} ${customClass}`
    : defaultClass;

  return (
    <button onClick={onClick} type={type} className={buttonClass}>
      <div className="flex items-center justify-center">{children}</div>
    </button>
  );
}

export default Button;
