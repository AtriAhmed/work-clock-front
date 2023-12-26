import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import Table from "../Table";
import timeDifference from "../../utils/timeDifference";
import Loading from "../Loading";

interface DateWorkLogProps {
  show: boolean;
  hide: () => void;
  toview: any;
}

export default function DateWorkLog({ show, hide, toview }: DateWorkLogProps) {
  const [toView, setToView] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (toview.date) {
      axios
        .get(
          `/api/work-logs/day/${toview.date}${
            toview.userId ? "/" + toview.userId : ""
          }`
        )
        .then((res) => {
          setToView(res.data);
          setLoading(false);
        });
    }
  }, [toview.date]);

  return (
    <Modal show={show} hide={hide} title={`pointage pour ${toview.date}`}>
      {loading ? (
        <Loading isModal={true} />
      ) : toView?.WorkLogs?.length > 0 ? (
        <Table
          head={
            <>
              <div className="col-span-4 text-center">DU</div>
              <div className="col-span-4 text-center">AU</div>
              <div className="col-span-4 text-center">TEMPS</div>
            </>
          }
        >
          {toView?.WorkLogs?.map((workLog: any) => (
            <div key={workLog?.id} className="grid grid-cols-12 p-3 gap-4">
              <div className="col-span-4 text-center">{workLog?.startTime}</div>
              <div className="col-span-4 text-center">
                {workLog?.endTime ? workLog.endTime : "En cours"}
              </div>
              <div className="col-span-4 text-center">
                {workLog?.endTime
                  ? timeDifference(workLog?.startTime, workLog?.endTime)
                  : "En cours"}
              </div>
            </div>
          ))}
        </Table>
      ) : (
        <div className="flex justify-center items-center font-semibold min-h-[100px]">
          Aucun pointage pour cette date
        </div>
      )}
    </Modal>
  );
}
