import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import {
  ThemeContextType,
  useThemeContext,
} from "../../utils/contexts/ThemeProvider";

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend);

function DoughnutChart() {
  const { theme, setTheme } = useThemeContext() as ThemeContextType;
  const [monthsLeaveRequests, setMonthsLeaveRequests] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/analytics/months-leave-requests").then((res) => {
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
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Nobembre",
    "Decembre",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Demandes de congé",
        data: monthsLeaveRequests,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading) return <Loading />;

  return (
    <Card title={"Demandes de Congé par Mois"}>
      <Doughnut options={options} data={data} />
    </Card>
  );
}

export default DoughnutChart;
