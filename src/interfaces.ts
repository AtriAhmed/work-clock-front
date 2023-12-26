interface User {
    id: number;
    name: string;
    email: string;
  }
  
  interface WorkLogData {
    [date: string]: any; // This defines that the keys are strings, and values are numbers
  }

  
  export type { User, WorkLogData };