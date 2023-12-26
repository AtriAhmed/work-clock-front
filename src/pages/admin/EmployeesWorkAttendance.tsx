import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import axios from "axios";
import Avatar from "react-avatar";
import formatTime from "../../utils/formatTime";
import MonthWorkLog from "../../components/work-attendance/MonthWorkLog";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Pagination from "../../components/Pagination";

function bonus(ms: number) {
  const sign = ms > 0 ? "+" : "-";
  ms = Math.abs(ms);

  const seconds = ms / 1000;
  const hours = Math.floor(seconds / 3600);

  const result = hours * 5;

  const formattedTime = `${sign}${result}`;

  return formattedTime;
}

function workTimeDifference(workLogs: any[], daysNb: number) {
  const last7WorkLogs = workLogs.slice(-daysNb);

  // Calculate the sum of totalWorkTime values for the last n workLogs
  const total = last7WorkLogs.reduce(
    (total, workLog) => total + workLog.totalWorkTime,
    0
  );

  const time = total - daysNb * 8 * 60 * 60 * 1000;
  return time;
}

function weekWorkLog(workLogs: any[]) {
  // Get the last 7 workLogs from the array
  const last7WorkLogs = workLogs.slice(-7);

  // Calculate the sum of totalWorkTime values for the last 7 workLogs
  const totalWorkTimeInSeconds = last7WorkLogs.reduce(
    (total, workLog) => total + workLog.totalWorkTime,
    0
  );

  return totalWorkTimeInSeconds;
}

function monthWorkLog(workLogs: any[]) {
  // Calculate the sum of totalWorkTime values
  const totalWorkTimeInSeconds = workLogs.reduce(
    (total, workLog) => total + workLog.totalWorkTime,
    0
  );

  return totalWorkTimeInSeconds;
}

export default function EmployeesWorkAttendance() {
  const [modalShow, setModalShow] = useState(false);

  const [toView, setToView] = useState({});

  const [users, setUsers] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Add a function to handle page change
  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    axios
      .get(`/api/work-logs/all-users?page=${currentPage}&pageSize=${pageSize}`)
      .then((res) => {
        console.log(res);
        setUsers(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      });
  }, []);

  return (
    <div className="pb-4">
      <Card title="Historique de presence des employées">
        <Table
          head={
            <>
              <div className="col-span-4">User</div>
              <div className="col-span-2 justify-self-center">
                Cette semaine
              </div>
              <div className="col-span-2 justify-self-center">Ce Mois</div>
              <div className="col-span-2 justify-self-center">Congés rest</div>
              <div className="col-span-2 justify-self-center">Écart</div>
            </>
          }
        >
          {users.map((user: any) => (
            <div
              key={user._id}
              className="grid grid-cols-12 bg-white dark:bg-gray-800 dark:text-white p-3 rounded shadow"
            >
              <div className="flex items-center space-x-3 col-span-4">
                <div
                  className=" cursor-pointer"
                  onClick={() => {
                    setToView(user);
                    setModalShow(true);
                  }}
                >
                  <Avatar
                    name={user.firstname}
                    src={"http://localhost:5000/" + user.picture} // Use null if picture is not available
                    size="50" // Adjust the size as needed
                    round={true}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <div className="font-bold">{user.firstname}</div>
                    <div className="text-sm">{user.lastname}</div>
                  </div>
                  <div className="text-sm opacity-50">{user.email}</div>
                </div>
              </div>
              <div className="col-span-2 self-center justify-self-center flex flex-col">
                <div className="text-center">
                  {formatTime(weekWorkLog(user?.DayWorkLogs), true)}
                </div>{" "}
                <div
                  className={`${
                    formatTime(workTimeDifference(user?.DayWorkLogs, 7))[0] ==
                    "-"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {formatTime(workTimeDifference(user?.DayWorkLogs, 7))}{" "}
                </div>{" "}
              </div>
              <div className="col-span-2 self-center justify-self-center flex flex-col">
                <div className="text-center">
                  {formatTime(monthWorkLog(user?.DayWorkLogs), true)}
                </div>{" "}
                <div
                  className={`${
                    formatTime(workTimeDifference(user?.DayWorkLogs, 30))[0] ==
                    "-"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {formatTime(workTimeDifference(user?.DayWorkLogs, 30))}{" "}
                </div>{" "}
              </div>
              <div className="col-span-2 self-center justify-self-center">
                {0}
              </div>
              <div className="col-span-2 self-center justify-self-center flex flex-col">
                <div
                  className={`${
                    formatTime(workTimeDifference(user?.DayWorkLogs, 30))[0] ==
                    "-"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {bonus(workTimeDifference(user?.DayWorkLogs, 30))}{" "}
                </div>{" "}
              </div>
            </div>
          ))}
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Card>
      <MonthWorkLog
        toview={toView}
        show={modalShow}
        hide={() => setModalShow(false)}
      />
    </div>
  );
}
