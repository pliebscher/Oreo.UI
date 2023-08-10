
// CREDIT: ChatGPT 3.5 "write a typescript function to format a 24 hour time into 12 hour time"
export function formatTimeTo12Hour(time24: string): string {
    const [hours, minutes] = time24.split(":").map(Number);
    
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        throw new Error("Invalid time format");
    }
    
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 === 0) ? 12 : hours % 12;
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes.toString();
    
    return `${formattedHours}:${formattedMinutes} ${period}`;
}