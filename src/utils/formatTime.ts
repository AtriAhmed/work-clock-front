export default function formatTime(ms: number,noSign?:boolean){

    const sign = ms > 0 ? "+" : "-";
    ms = Math.abs(ms);

    const seconds = ms / 1000;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedTime = `${noSign ? "" : sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

    return formattedTime;
}