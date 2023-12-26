import React, { useState } from "react";
import Card from "../../components/Card";
import axios from "axios";
import bonus from "../../utils/bonus";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";
import MonthsAvgWorkHours from "../../components/analytics/MonthsAvgWorkHours";
import WeekdaysAvgWorkHours from "../../components/analytics/WeekdaysAvgWorkHours";
import BarChart from "../../components/analytics/BarChart";
import DoughnutChart from "../../components/analytics/DoughnutChart";
import Loading from "../../components/Loading";

export default function Dashboard() {
  const [salariesSumLoading, setSalariesSumLoading] = useState(true);
  const [salariesSum, setSalariesSum] = useState();

  const [motivationLoading, setMotivationLoading] = useState(true);
  const [motivation, setMotivation] = useState<number>();
  const [reduction, setReduction] = useState<number>();

  axios.get("/api/analytics/salaries-sum").then((res: any) => {
    setSalariesSum(res.data);
    setSalariesSumLoading(false);
  }, []);

  axios.get("/api/analytics/motivation-and-reduction").then((res: any) => {
    console.log(res.data);
    setMotivation(res.data.positiveDifferenceSum);
    setReduction(res.data.negativeDifferenceSum);
    setMotivationLoading(false);
  }, []);

  if (salariesSumLoading || motivationLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-6 p-2 pb-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <Card title="">
            <div className="text-gray-500 dark:text-white">Salaires</div>
            <div className="flex justify-between">
              <div className="text-2xl text-indigo-700 dark:text-indigo-500 font-bold">
                {salariesSum} DT
              </div>{" "}
              <div>
                <BanknotesIcon className="h-8 w-8 text-indigo-700 dark:text-indigo-500" />{" "}
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 ">
              Dernier 30 jours
            </div>
          </Card>
        </div>
        <div className="col-span-4">
          <Card title="">
            <div className=" text-gray-500 dark:text-white">Motivation</div>
            <div className="flex justify-between">
              <div className="text-2xl text-green-500 font-bold">
                {motivation != null && motivation != undefined
                  ? bonus(motivation)
                  : ""}{" "}
                DT
              </div>{" "}
              <div>
                <ArrowUpIcon className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Dernier 30 jours
            </div>
          </Card>
        </div>
        <div className="col-span-4">
          <Card title="">
            <div className=" text-gray-500 dark:text-white">Reduction</div>
            <div className="flex justify-between">
              <div className="text-2xl text-red-500 font-bold">
                {reduction ? bonus(reduction) : ""} DT
              </div>{" "}
              <div>
                {" "}
                <ArrowDownIcon className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Dernier 30 jours
            </div>
          </Card>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 mt-0 grid-cols-1 gap-6">
        <MonthsAvgWorkHours />
        <WeekdaysAvgWorkHours />
      </div>

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <BarChart />
        <DoughnutChart />
      </div>
    </div>
  );
}
