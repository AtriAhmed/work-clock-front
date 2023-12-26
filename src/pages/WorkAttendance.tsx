import React, { useEffect, useState } from "react";
import Calendar from "../components/work-attendance/Calendar";
import axios from "axios";
import { WorkLogData } from "../interfaces";
import Loading from "../components/Loading";
import moment from "moment";

export default function WorkAttendance() {
  const [daysLogs, setDaysLogs] = useState<WorkLogData>([]);

  const [loading, setLoading] = useState(true);

  const today = moment().startOf("day");

  const [currMonth, setCurrMonth] = useState(() =>
    moment(today).format("MMM-yyyy")
  );

  useEffect(() => {
    console.log(currMonth);
    axios.get(`/api/work-logs/specified-month/${currMonth}`).then((res) => {
      setDaysLogs(res.data);
      setLoading(false);
    });
  }, [currMonth]);

  if (loading) return <Loading />;
  return (
    <Calendar
      dayslogs={daysLogs}
      currmonth={currMonth}
      setcurrmonth={setCurrMonth}
    />
  );
}
