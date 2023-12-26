import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import Card from "../Card";
import {
  ThemeContextType,
  useThemeContext,
} from "../../utils/contexts/ThemeProvider";

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend);

function PieChart() {
  const { theme, setTheme } = useThemeContext() as ThemeContextType;
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
    "India",
    "Middle East",
    "Europe",
    "US",
    "Latin America",
    "Asia(non-india)",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "# of Orders",
        data: [122, 219, 30, 51, 82, 13],
        backgroundColor: [
          "rgba(255, 99, 255, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 255, 0.8)",
          "rgba(75, 192, 255, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 255, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 255, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 255, 1)",
          "rgba(75, 192, 255, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card title={"Orders by country"}>
      <Pie options={options} data={data} />
    </Card>
  );
}

export default PieChart;
