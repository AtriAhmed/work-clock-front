import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="text-xl font-semibold text-center">{title}</div>
      <div className='p-4'>
      {children}
      </div>
    </div>
  );
};

export default Card;
