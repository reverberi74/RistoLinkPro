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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: false,
    title: {
      display: false,
      text: "Recensioni",
    },
  },
};
export const labels = [
  "jan",
  "feb",
  "march",
  "april",
  "may",
  "june",
  "july",
  "aug",
  "sept",
  "oct",
  "nov",
  "dec",
];

const ChartReviews = () => {
  const data = {
    labels,
    datasets: [
      {
        label: "Reviews",
        data: [2, 5, 4, 2, 5, 4],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
  return <Bar data={data} options={options} />;
};

export default ChartReviews;
