import { useEffect, useState } from "react";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import moment from "moment";
import Card from "../Card";
import DateWorkLog from "./DateWorkLog";
import formatTime from "../../utils/formatTime";
import { WorkLogData } from "../../interfaces";
import Button from "../Button";

interface CalendarProps {
  dayslogs: WorkLogData;
  user?: any;
  currmonth?: string;
  setcurrmonth?: any;
}

function formatDate(day: any) {
  return `${day.getFullYear()}-${(day.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${day.getDate().toString().padStart(2, "0")}`;
}

const Calendar: React.FC<CalendarProps> = ({
  dayslogs,
  user,
  currmonth,
  setcurrmonth,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [toView, setToView] = useState({
    date: "",
    userId: null,
  });

  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    moment().startOf("month")
  );

  const allDaysInMonth = () => {
    let start = moment(firstDayOfMonth).startOf("week");
    let end = moment(moment(firstDayOfMonth).endOf("month")).endOf("week");
    var days = [];
    var day = start;
    while (day <= end) {
      days.push(day.toDate());
      day = day.clone().add(1, "d");
    }
    return days;
  };

  const isToday = (date: any) => {
    return moment(date).isSame(moment(), "day");
  };

  const isDifferentMonth = (date: any) => {
    return moment(date).month() != moment(firstDayOfMonth).month();
  };

  const getPrevMonth = (event: any) => {
    const firstDayOfPrevMonth = moment(firstDayOfMonth)
      .add(-1, "M")
      .startOf("month");
    setFirstDayOfMonth(firstDayOfPrevMonth);
    setcurrmonth(moment(firstDayOfPrevMonth).format("MMM-yyyy"));
  };

  const getCurrentMonth = (event: any) => {
    const firstDayOfCurrMonth = moment().startOf("month");
    setFirstDayOfMonth(firstDayOfCurrMonth);
    setcurrmonth(moment(firstDayOfCurrMonth).format("MMM-yyyy"));
  };

  const getNextMonth = (event: any) => {
    const firstDayOfNextMonth = moment(firstDayOfMonth)
      .add(1, "M")
      .startOf("month");
    setFirstDayOfMonth(firstDayOfNextMonth);
    setcurrmonth(moment(firstDayOfNextMonth).format("MMM-yyyy"));
  };

  return (
    <div className="pb-4">
      <Card title="">
        <div className="w-full  bg-base-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 sm:gap-4">
              <button
                className="btn  btn-square btn-sm btn-ghost"
                onClick={getPrevMonth}
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>

              <p className="font-semibold text-xl w-48">
                {moment(firstDayOfMonth).format("MMMM yyyy").toString()}
              </p>

              <button
                className="btn btn-square btn-sm btn-ghost"
                onClick={getNextMonth}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            <Button customClassnames="text-sm" onClick={getCurrentMonth}>
              Ce mois-ci
            </Button>
          </div>
          <div className="my-4 divider" />
          <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-center">
            {weekdays.map((day, key) => {
              return (
                <div className="text-xs capitalize" key={key}>
                  {day}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-7 mt-1  place-items-center">
            {allDaysInMonth().map((day, idx) => {
              return (
                <div
                  key={idx}
                  className={
                    colStartClasses[moment(day).day()] +
                    " border border-solid w-full h-28  "
                  }
                >
                  <p
                    onClick={() => {
                      setToView({
                        date: formatDate(day),
                        userId: user?._id || "",
                      });
                      setModalShow(true);
                    }}
                    className={`flex items-center justify-center h-8 w-8 rounded-full mx-1 mt-1 text-sm cursor-pointer hover:bg-base-300 ${
                      isToday(day) &&
                      " bg-blue-100 dark:bg-blue-400 dark:hover:bg-base-300 dark:text-white"
                    } ${
                      isDifferentMonth(day) &&
                      " text-slate-400 dark:text-slate-600"
                    }`}
                  >
                    {" "}
                    {moment(day).format("D")}
                  </p>
                  <div
                    className={`xl:text-xl lg:text-lg md:text-base px-2 mt-1 truncate flex justify-center h-6 items-center`}
                  >
                    {" "}
                    {dayslogs[formatDate(day)]
                      ? formatTime(
                          dayslogs[formatDate(day)] + 8 * 60 * 60 * 1000,
                          true
                        )
                      : ""}{" "}
                  </div>
                  <div
                    className={`xl:text-md lg:text-sm px-2 mt-1 truncate flex justify-center font-semibold h-6 items-center ${
                      dayslogs[formatDate(day)] < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {" "}
                    {dayslogs[formatDate(day)]
                      ? formatTime(dayslogs[formatDate(day)])
                      : ""}{" "}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      <DateWorkLog
        show={modalShow}
        hide={() => {
          setModalShow(false);
        }}
        toview={toView}
      />
    </div>
  );
};

export default Calendar;
