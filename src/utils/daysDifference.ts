export default function daysDifference(startDate:any, endDate:any) {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const firstDate:any = new Date(startDate);
    const secondDate:any = new Date(endDate);
  
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    
    return diffDays;
  }
  