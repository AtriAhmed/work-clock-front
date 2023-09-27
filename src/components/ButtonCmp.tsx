import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ButtonCmp: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonCmp;
