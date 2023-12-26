import React, { ReactNode } from "react";

interface TableProps {
  head: ReactNode;
  children: ReactNode;
}

const Table: React.FC<TableProps> = ({ children, head }) => {
  return (
    <div className="flex grow flex-col dark:bg-gray-800">
      <div className="grid grid-cols-12 bg-gray-100 dark:bg-gray-900 dark:text-white font-semibold rounded-t-lg p-3 text-sm">
        {head}
      </div>
      <div className="flex grow  flex-col divide-y-[1px] dark:border-x dark:border-b dark:border-gray-700 dark:text-white">
        {children}
      </div>
    </div>
  );
};

export default Table;
