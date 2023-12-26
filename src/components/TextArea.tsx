import React, { ChangeEvent, TextareaHTMLAttributes } from "react";

interface CustomTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  divClassNames?: string;
  error?: string;
}

const TextArea: React.FC<CustomTextAreaProps> = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  divClassNames,
  error,
}) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`${divClassNames} flex flex-col gap-2`}>
      {label ? (
        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
          {label}
        </label>
      ) : (
        ""
      )}
      <textarea
        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
      <span className="text-red-500">{error ? error : ""}</span>
    </div>
  );
};

export default TextArea;
