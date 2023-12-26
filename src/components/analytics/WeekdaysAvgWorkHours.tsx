import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Card from "../Card";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import {
  ThemeContextType,
  useThemeContext,
} from "../../utils/contexts/ThemeProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function WeekdaysAvgWorkHours() {
  const { theme, setTheme } = useThemeContext() as ThemeContextType;
  const [weekdaysAvgWorkHours, setWeekdaysAvgWorkHours] = useState();
  const [weekdaysAvgWorkHoursLoading, setWeekdaysAvgWorkHoursLoading] =
    useState(true);

  useEffect(() => {
    axios.get("/api/analytics/weekdays-avg-work-hours").then((res) => {
      setWeekdaysAvgWorkHours(res.data);
      setWeekdaysAvgWorkHoursLoading(false);
    });
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: `${theme == "dark" ? "white" : "black"}`, // Set the font color for the x-axis labels
        },
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  const data = {
    labels,
    datasets: [
      {
        label: "Heures du travail",
        data: weekdaysAvgWorkHours,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  if (weekdaysAvgWorkHoursLoading) return <Loading />;

  return (
    <Card title={"Moyenne des Heures de Travail par Jour de la Semaine"}>
      <Bar options={options} data={data} />
    </Card>
  );
}
