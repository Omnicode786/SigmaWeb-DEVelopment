import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const PieChart = ({ chartData, title = "Distribution", options = {} }) => {
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
      <Pie data={chartData} options={finalOptions} />
    </div>
  );
};

export default PieChart;