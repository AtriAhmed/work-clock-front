import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import TableCmp from '../components/TableCmp'
import axios from 'axios';
import CountUp from '../components/work-clock/CountUp';
import CountDown from '../components/work-clock/CountDown';


interface WorkLog {
    id: number;
    startTime: Date;
    endTime: Date | null;
  }

  function timeDifference(startTime:any, endTime:any) {
    const [startTimeHours, startTimeMinutes, startTimeSeconds] = startTime.split(':');
    const [endTimeHours, endTimeMinutes, endTimeSeconds] = endTime.split(':');
  
    // Convert the time parts to seconds
    const startTimeInSeconds =
      parseInt(startTimeHours, 10) * 3600 +
      parseInt(startTimeMinutes, 10) * 60 +
      parseInt(startTimeSeconds, 10);
  
    const endTimeInSeconds =
      parseInt(endTimeHours, 10) * 3600 +
      parseInt(endTimeMinutes, 10) * 60 +
      parseInt(endTimeSeconds, 10);
  
    // Calculate the time difference in seconds
    const timeDifferenceInSeconds = endTimeInSeconds - startTimeInSeconds;
  
    // Convert the time difference back to hh:mm:ss format
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    const seconds = timeDifferenceInSeconds % 60;
  
    // Format the result as hh:mm:ss
    const formattedResult = `${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
    return formattedResult;
  }

export default function WorkClock() {

    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const [dayWorkLog,setDayWorkLog] = useState<any>({})

    useEffect(()=>{
      axios.get('/api/work-logs').then(res=>{
setDayWorkLog(res.data);
      })
    },[])

    useEffect(()=>{
      const checkWorkLogStatus = async () => {
        try {
          const response = await axios.get("/api/work-logs/status"); // Replace with your API endpoint
  
          // Check the response and update isTimerRunning accordingly
          if (response.data.status === "opened") {
            console.log("opened")
            setIsTimerRunning(true);
          } else {
            console.log(response.data.status)
            setIsTimerRunning(false);
          }
        } catch (error) {
          console.error("Error:", error);
          // Handle error
        }
      };
  
      // Call the function to check the workLog status when the component mounts
      checkWorkLogStatus();
    },[])

  const handlePointageClick = async () => {
    if (!isTimerRunning) {
      // Start the timer and create a workLog item
      const newStartTime = new Date();
      setIsTimerRunning(true);

      // Create a workLog item in the database via your Express API
      try {

const data = {startTime: newStartTime}
        const response = await axios.post<WorkLog>("/api/work-logs", data);
       
      } catch (error) {
        console.error("Error creating workLog:", error);
      }
    } else {
      // Stop the timer and update the workLog item
        const endTime = new Date();
        // Update the workLog item in the database via your Express API
        try {
          await axios.post(`/api/work-logs`, {endTime});
        } catch (error) {
          console.error("Error updating workLog:", error);
        }
        setIsTimerRunning(false);
    }

    axios.get('/api/work-logs').then(res=>{
      setDayWorkLog(res.data);
            })
    
  };

  return (
    <div className="max-w-5xl mx-auto">
<div className="grid grid-cols-12 gap-4">
    <div className='col-span-4'>
    <Card title="" customClassNames='h-full' contentClassNames='flex justify-center items-center'>
<CountDown run={isTimerRunning} startFrom={8 * 60 * 60 * 1000 - dayWorkLog.totalWorkTime} />
    </Card>
    </div>
    <div className='col-span-4'>
    <Card title="" customClassNames='h-full' contentClassNames='flex flex-col justify-center items-center gap-4'>

     <CountUp run={isTimerRunning} startFrom={dayWorkLog.totalWorkTime} />
<button className={`${isTimerRunning ? "bg-red-500" : "bg-indigo-600"} transition duration-300 py-2 px-4 rounded-lg text-white font-semibold text-sm`} onClick={handlePointageClick}>{isTimerRunning ? "Pointage de sortie" : "Pointage d'entrée"}</button>
      
    </Card>
    </div>
    <div className='col-span-4'>
    <Card title="">
hello
    </Card>
    </div>
</div>
<div className='pt-2'>
<Card title='Pointage'>
    <TableCmp head={<>
        <div className='col-span-3 text-center'>N°</div>
  <div className='col-span-3 text-center'>DU</div>
  <div className='col-span-3 text-center'>AU</div>
  <div className='col-span-3 text-center'>TEMPS</div>
    </>}>
{dayWorkLog.WorkLogs?.map((workLog:any,index:number)=><div key={workLog.id} className='grid grid-cols-12 p-3'>
<div className='col-span-3 text-center'>{index}</div>
<div className='col-span-3 text-center'>{workLog.startTime}</div>
<div className='col-span-3 text-center'>{workLog.endTime ? workLog.endTime : "Still going"}</div>
<div className='col-span-3 text-center'>{workLog.endTime ? timeDifference(workLog.startTime,workLog.endTime) : "still going"}</div>
</div>
)}
    </TableCmp>
</Card>
</div>
    </div>
  )
}