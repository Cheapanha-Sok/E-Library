import PropTypes from "prop-types";

export default function Input({
  style,
  type,
  id,
  onChange,
  placeholder,
  autoComplete,
  onClick,
  checked,
  defaultValue,
  required,
  accept,
}) {
  return (
    <input
      className={style}
      type={type}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onClick={onClick}
      checked={checked}
      defaultValue={defaultValue}
      required={required}
      accept={accept}
    />
  );
}

Input.propTypes = {
  style: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  defaultValue: PropTypes.any,
  required: PropTypes.bool,
  accept : PropTypes.string,
};

