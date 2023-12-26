import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import axios from "axios";
import HolidaysCalendar from "../../components/company-settings/HolidaysCalendar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

const WEEKDAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export default function CompanySettings() {
  const [loading, setLoading] = useState(true);
  const [restDays, setRestDays] = useState<Number[]>([]);
  const [leaveDays, setLeaveDays] = useState();
  const [holidays, setHolidays] = useState<any[]>([]);

  function getHolidays() {
    axios.get("/api/company-settings/holidays").then((res) => {
      setHolidays(res.data);
    });
  }

  useEffect(() => {
    axios.get("/api/company-settings").then((res) => {
      let array: Number[] = JSON.parse(res.data.weekRestDays);
      setRestDays(array);
      setLeaveDays(res.data.yearLeaveDays);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getHolidays();
  }, []);

  const toggleWorkStatus = (index: any) => {
    let updatedWeekDays: Number[] = Array.from(restDays);
    if (updatedWeekDays.includes(index))
      updatedWeekDays = updatedWeekDays.filter((day) => day != index);
    else {
      updatedWeekDays.push(index);
    }
    setRestDays(updatedWeekDays);
  };

  const handleLeaveDaysChange = (e: any) => {
    setLeaveDays(e.target.value);
  };

  function update() {
    const data = {
      weekRestDays: JSON.stringify(restDays),
      yearLeaveDays: leaveDays,
    };
    axios.put(`/api/company-settings/${1}`, data).then((res) => {
      console.log("updated successfully");
    });
  }

  if (loading) return <Loading />;

  return (
    <Card
      title="Paramétres de l'entreprise"
      contentClassNames="flex flex-col gap-4"
    >
      <section>
        <div className="border-b mb-2">Jour de Travail / Repos par semaine</div>
        <div className="grid grid-cols-7 bg-gray-100 dark:bg-gray-900 rounded-t-lg divide-x-2 divide-white">
          {WEEKDAYS?.map((jour, index) => (
            <div key={index} className="p-1 flex justify-center font-semibold">
              {jour}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 divide-x-2 divide-white">
          {WEEKDAYS?.map((day, index) => (
            <div
              key={index}
              className={`cursor-pointer p-4 flex justify-center text-white font-bold transition-all duration-300 ${
                !restDays.includes(index) ? "bg-green-500" : "bg-red-500"
              }`}
              onClick={() => toggleWorkStatus(index)}
            >
              {!restDays.includes(index) ? "Travail" : "Repos"}
            </div>
          ))}
        </div>
      </section>
      <div>
        <div className="border-b mb-2">
          Nbre de jours de congé payée par année:
        </div>
        <Input
          name="leaveDays"
          value={leaveDays}
          onChange={handleLeaveDaysChange}
        />
      </div>
      <div>
        <Button onClick={() => update()}>Mise a jour</Button>
      </div>
      <div>
        <HolidaysCalendar events={holidays} getholidays={getHolidays} />
      </div>
    </Card>
  );
}
