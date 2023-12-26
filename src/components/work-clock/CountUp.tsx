import React, { useEffect, useState } from "react";

interface CountUpProps {
  startFrom: number;
  run: boolean;
}

const CountUp: React.FC<CountUpProps> = ({ startFrom, run }) => {
  const [timerInSeconds, setTimerInSeconds] = useState(0);

  useEffect(() => {
    const currentMilliseconds = Date.now();
    const elapsedMilliseconds =
      -1 * (currentMilliseconds - (startFrom + currentMilliseconds));
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    setTimerInSeconds(elapsedSeconds);
  }, [startFrom]);

  useEffect(() => {
    let intervalId: any;

    // Function to start the timer
    const startTimer = () => {
      const currentMilliseconds = Date.now();
      const elapsedMilliseconds =
        -1 * (currentMilliseconds - (startFrom + currentMilliseconds));
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
      setTimerInSeconds(elapsedSeconds);

      intervalId = setInterval(() => {
        setTimerInSeconds((prevTimerInSeconds) => prevTimerInSeconds + 1);
      }, 1000);
    };

    // Function to stop the timer
    const stopTimer = () => {
      clearInterval(intervalId);
    };

    // Start or stop the timer based on the run prop
    if (run) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => stopTimer();
  }, [startFrom, run]);

  // Function to format seconds into hh:mm:ss
  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

    return formattedTime;
  }

  return (
    <div className="w-fit aspect-square flex flex-col justify-center items-center rounded-[50%] border-black dark:border-white border p-4">
      <div className="font-bold">Totale:</div>
      <div className="text-2xl">{formatTime(timerInSeconds)}</div>
    </div>
  );
};

export default CountUp;
