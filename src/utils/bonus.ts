export default function bonus(ms: number) {
    const sign = ms > 0 ? "+" : ms < 0 ? "-" : "";
    ms = Math.abs(ms);
  
    const seconds = ms / 1000;
    const hours = Math.floor(seconds / 3600);
  
    const result = hours * 5;
  
    const formattedTime = `${sign}${result}`;
  
    return formattedTime;
  }