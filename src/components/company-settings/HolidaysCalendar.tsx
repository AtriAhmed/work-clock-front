import { useEffect, useState } from "react";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import moment from "moment";
import Card from "../Card";
import ViewDateEvent from "./ViewDateEvent";
import AddHoliday from "./AddHoliday";
import Button from "../Button";

interface CalendarProps {
  events: any;
  getholidays: () => void;
}

function formatDate(day: any) {
  return `${(day.getMonth() + 1).toString().padStart(2, "0")}-${day
    .getDate()
    .toString()
    .padStart(2, "0")}`;
}

const HolidaysCalendar: React.FC<CalendarProps> = ({ events, getholidays }) => {
  const [modalShow, setModalShow] = useState(false);
  const [toView, setToView] = useState({});

  const today = moment().startOf("day");
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

  const [currMonth, setCurrMonth] = useState(() =>
    moment(today).format("MMM-yyyy")
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
    setCurrMonth(moment(firstDayOfPrevMonth).format("MMM-yyyy"));
  };

  const getCurrentMonth = (event: any) => {
    const firstDayOfCurrMonth = moment().startOf("month");
    setFirstDayOfMonth(firstDayOfCurrMonth);
    setCurrMonth(moment(firstDayOfCurrMonth).format("MMM-yyyy"));
  };

  const getNextMonth = (event: any) => {
    const firstDayOfNextMonth = moment(firstDayOfMonth)
      .add(1, "M")
      .startOf("month");
    setFirstDayOfMonth(firstDayOfNextMonth);
    setCurrMonth(moment(firstDayOfNextMonth).format("MMM-yyyy"));
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

            <div>
              <Button
                onClick={() => {
                  setToView({
                    month: moment(currMonth, "MMM-yyyy").month() + 1,
                  });
                  setModalShow(true);
                }}
              >
                Ajouter jour ferié
              </Button>
            </div>
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
                        month: day.getMonth() + 1,
                        day: day.getDate(),
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
                    className={`xl:text-md lg:text-sm px-2 mt-1 truncate flex justify-center font-semibold h-6 items-center`}
                  >
                    {" "}
                    {events[formatDate(day)]
                      ? events[formatDate(day)]
                      : ""}{" "}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      {/* <ViewDateEvent
        show={modalShow}
        hide={() => {
          setModalShow(false);
        }}
        toview={toView}
      /> */}
      <AddHoliday
        show={modalShow}
        hide={() => {
          setModalShow(false);
          getholidays();
        }}
        toview={toView}
      />
    </div>
  );
};

export default HolidaysCalendar;
