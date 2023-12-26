import React, { ChangeEvent, SelectHTMLAttributes } from "react";

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  divClassNames?: string;
  error?: string;
}

const Select: React.FC<CustomSelectProps> = ({
  label,
  name,
  value,
  onChange,
  divClassNames,
  error,
  children,
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
      <select
        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {children}
      </select>
      <span className="text-red-500">{error ? error : ""}</span>
    </div>
  );
};

export default Select;
