import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  right?: ReactNode;
  children: ReactNode;
  customClassNames?: string;
  contentClassNames?: string;
}

const Card: React.FC<CardProps> = ({ title, children, right,customClassNames,contentClassNames }) => {
  return (
    <div className={`bg-white rounded-xl p-4 shadow-xl ${customClassNames}`} >
     {title ? <div className="flex justify-between border-b mb-5 items-center pb-2"><div className='text-xl font-semibold mb-3 dark:text-white'>{title}</div> <div>{right}</div> </div> : "" } 
      <div className={`p-4 ${contentClassNames}`}>
      {children}
      </div>
    </div>
  );
};

export default Card;
