import React, { useEffect, useState } from "react";

interface CountDownProps {
  startFrom: number;
  run: boolean;
}

const CountDown: React.FC<CountDownProps> = ({ startFrom, run }) => {
  const [timerInSeconds, setTimerInSeconds] = useState(startFrom);

  useEffect(()=>{
    const currentMilliseconds = Date.now();
    const elapsedMilliseconds = -1 * (currentMilliseconds - (startFrom + currentMilliseconds));
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    if(elapsedSeconds > 0)
    setTimerInSeconds(elapsedSeconds);
  else 
  setTimerInSeconds(0)

  },[startFrom])

  useEffect(() => {
    let intervalId:any;

    // Function to start the countdown
    const startCountdown = () => {
      intervalId = setInterval(() => {
        if (timerInSeconds > 0) {
          setTimerInSeconds((prevTimerInSeconds) => prevTimerInSeconds - 1);
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
  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

    return formattedTime;
  }

  return <div className="w-fit aspect-square flex flex-col justify-center items-center rounded-[50%] border-black border p-4">
            <div className="font-bold">Encore:</div>
            <div className="text-2xl">{formatTime(timerInSeconds)}</div>
          </div>
   
};

export default CountDown;
