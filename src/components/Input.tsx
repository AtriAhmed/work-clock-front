import React, { ChangeEvent, InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  divClassNames?: string;
  error?: string;
}

const Input: React.FC<CustomInputProps> = ({
  type,
  label,
  placeholder,
  name,
  value,
  onChange,
  divClassNames,
  error,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`${divClassNames} flex flex-col gap-1`}>
      {label ? (
        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
          {label}
        </label>
      ) : (
        ""
      )}
      <input
        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        type={type ? type : "text"}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
      <span className="text-red-500">{error ? error : ""}</span>
    </div>
  );
};

export default Input;
