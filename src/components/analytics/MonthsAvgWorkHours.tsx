import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import Card from "../Card";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import {
  ThemeContextType,
  useThemeContext,
} from "../../utils/contexts/ThemeProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function MonthsAvgWorkHours() {
  const { theme, setTheme } = useThemeContext() as ThemeContextType;
  const [monthsAvgWorkHours, setMonthsAvgWorkHours] = useState();
  const [monthsAvgWorkHoursLoading, setMonthsAvgWorkHoursLoading] =
    useState(true);

  useEffect(() => {
    axios.get("/api/analytics/months-avg-work-hours").then((res) => {
      setMonthsAvgWorkHours(res.data);
      setMonthsAvgWorkHoursLoading(false);
    });
  }, []);

  const options = {
    scales: {
      x: {
        ticks: {
          color: `${theme == "dark" ? "white" : "black"}`, // Set the font color for the x-axis labels
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Nov",
    "Dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Heures du travail",
        data: monthsAvgWorkHours,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  if (monthsAvgWorkHoursLoading) return <Loading />;

  return (
    <Card title={"Moyenne des Heures de Travail Annuelles des Employés"}>
      <Line data={data} options={options} />
    </Card>
  );
}
