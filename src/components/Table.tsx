import React, { ReactNode } from 'react'


interface TableProps {
    head: ReactNode;
    children: ReactNode;
  }

  const TableCmp: React.FC<TableProps> = ({children,head})=>{

  return (
    <div className="flex flex-col">
    <div className='grid grid-cols-12 bg-gray-100 font-semibold rounded-t-lg p-3 text-sm'>
    {head}
    </div>
    <div className="flex flex-col divide-y-[1px]">
   {children}
    </div>
  </div>
  )
}

export default TableCmp;