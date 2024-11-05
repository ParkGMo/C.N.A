import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function ChartBar({ data, datasets, label }) {
  const chartData = {
    labels: data.map((item) => item.label || item.공항),
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: data.map((item) => item[dataset.dataKey]),
      backgroundColor: dataset.backgroundColor,
      borderColor: dataset.borderColor,
    })),
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} />;
}

export default ChartBar;
