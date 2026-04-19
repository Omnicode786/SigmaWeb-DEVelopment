import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0,
      },
    },
  },
};

const BarChart = ({ chartData, title = "Watchlist Status", options = {} }) => {
  const finalOptions = {
    ...baseOptions,
    ...options,
    plugins: {
      ...baseOptions.plugins,
      ...options.plugins,
      title: {
        display: Boolean(title),
        text: title,
      },
    },
  };

  return (
    <div className="h-[350px] w-full">
      <Bar data={chartData} options={finalOptions} />
    </div>
  );
};

export default BarChart;