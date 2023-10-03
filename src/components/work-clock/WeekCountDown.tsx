import React, { useEffect, useState } from "react";

interface WeekCountDownProps {
  startFrom: number;
  run: boolean;
}

const WeekCountDown: React.FC<WeekCountDownProps> = ({ startFrom, run }) => {
  const [timerInSeconds, setTimerInSeconds] = useState(startFrom);

  useEffect(()=>{
    setTimerInSeconds(startFrom);
  },[startFrom])

  useEffect(() => {
    let intervalId:any;

    // Function to start the countdown
    const startCountdown = () => {
      intervalId = setInterval(() => {
        if (timerInSeconds < 0) {
          setTimerInSeconds((prevTimerInSeconds) => prevTimerInSeconds + 1);
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
    };

    // Function to stop the countdown
    const stopCountdown = () => {
      clearInterval(intervalId);
    };

    // Start or stop the countdown based on the run prop
    if (run) {
      startCountdown();
    } else {
      stopCountdown();
    }

    return () => stopCountdown();
  }, [startFrom, run]);

  // Function to format seconds into hh:mm:ss
  function formatTime(time: number) {
    const sign = time > 0 ? "" : "-";
    const result = Math.abs(time);

    const hours = Math.floor(result / 3600);
    const minutes = Math.floor((result % 3600) / 60);
    const seconds = Math.floor(result % 60);
  
    return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return  <div className="w-fit aspect-square flex flex-col justify-center items-center p-4">
            <div className="font-bold">Semaine:</div>
            <div className="text-2xl text-red-500">{formatTime(timerInSeconds)}</div>
          </div>
   
};

export default WeekCountDown;
