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
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const [monthsLeaveRequests, setMonthsLeaveRequests] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useThemeContext() as ThemeContextType;

  useEffect(() => {
    axios.get("/api/analytics/months-leave-requests-status").then((res) => {
      setMonthsLeaveRequests(res.data);
      setLoading(false);
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Accepté",
        data: monthsLeaveRequests?.approuved,
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
      {
        label: "Refusé",
        data: monthsLeaveRequests?.rejected,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  if (loading) return <Loading />;

  return (
    <Card title={"Demandes de Congé Approuvées et Refusées par Mois"}>
      <Bar options={options} data={data} />
    </Card>
  );
}

export default BarChart;
