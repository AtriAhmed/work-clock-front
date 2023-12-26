import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  customClassnames?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  customClassnames,
  ...rest
}) => {
  return (
    <button
      className={`bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${customClassnames}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
