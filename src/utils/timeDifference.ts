export default function timeDifference(startTime:any, endTime:any) {
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
