import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import BarChart from "../../components/analytics/BarChart";
import ScatterChart from "../../components/analytics/ScatterChart";
import DoughnutChart from "../../components/analytics/DoughnutChart";
import PieChart from "../../components/analytics/PieChart";
import MonthsAvgWorkHours from "../../components/analytics/MonthsAvgWorkHours";
import WeekdaysAvgWorkHours from "../../components/analytics/WeekdaysAvgWorkHours";

function Analytics() {
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDatePickerValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
  };

  return (
    <>
      <Datepicker
        containerClassName="w-72"
        value={dateValue}
        inputClassName="input input-bordered w-72"
        popoverDirection="down"
        toggleClassName="invisible"
        onChange={handleDatePickerValueChange}
        showShortcuts={true}
        primaryColor="blue"
      />

      <div className="grid lg:grid-cols-2 mt-0 grid-cols-1 gap-6">
        <MonthsAvgWorkHours />
        <WeekdaysAvgWorkHours />
      </div>

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <BarChart />
        <DoughnutChart />
      </div>

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        {/* <ScatterChart /> */}
        {/* <PieChart /> */}
      </div>
    </>
  );
}

export default Analytics;
