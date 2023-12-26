import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import axios from "axios";
import Modal from "../Modal";
import Loading from "../Loading";

export default function MonthWorkLog({
  toview,
  show,
  hide,
}: {
  toview: any;
  show: boolean;
  hide: () => void;
}) {
  const [daysLogs, setDaysLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (toview)
      axios.get(`/api/work-logs/month/${toview._id}`).then((res) => {
        setDaysLogs(res.data);
        setLoading(false);
      });
  }, [toview]);

  return (
    <Modal
      title={`Pointage ${toview?.firstname} ${toview?.lastname}`}
      show={show}
      hide={hide}
    >
      {loading ? <Loading /> : <Calendar dayslogs={daysLogs} user={toview} />}
    </Modal>
  );
}
