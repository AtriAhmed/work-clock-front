import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import axios from 'axios';
import TableCmp from '../Table';
import timeDifference from '../../utils/timeDifference';

interface DateWorkLogProps{
    show: boolean;
    hide: ()=>void;
    toview: string;
}

export default function DateWorkLog({show,hide,toview}:DateWorkLogProps) {
  const [toView, setToView] = useState<any>()

useEffect(()=>{
  if(toview)
axios.get(`/api/work-logs/day/${toview}`).then(res=>{
  setToView(res.data)
})
},[toview])

  return (
    <Modal show={show} hide={hide} title={`pointage pour ${toview}`}>
        <TableCmp head={<>
  <div className='col-span-4 text-center'>DU</div>
  <div className='col-span-4 text-center'>AU</div>
  <div className='col-span-4 text-center'>TEMPS</div>
    </>}>
{toView?.WorkLogs?.map((workLog:any)=><div key={workLog?.id} className='grid grid-cols-12 p-3 gap-4'>
<div className='col-span-4 text-center'>{workLog?.startTime}</div>
<div className='col-span-4 text-center'>{workLog?.endTime ? workLog.endTime : "Still going"}</div>
<div className='col-span-4 text-center'>{workLog?.endTime ? timeDifference(workLog?.startTime,workLog?.endTime) : "still going"}</div>
</div>
)}
    </TableCmp>
    </Modal>
  )
}
