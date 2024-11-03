import React from "react";
import { Doughnut } from "react-chartjs-2";

function ChartDouqhut({ data, colors, label, dataKey }) {
  const backgroundColor = colors || [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(153, 102, 255)",
    "rgb(255, 159, 64)",
    "rgb(255, 99, 132)",
    "rgb(100, 255, 218)",
    "rgb(0, 200, 83)",
    "rgb(255, 45, 85)",
  ];
  const chartdata = {
    labels: data.map((item) => item.label || item.공항),
    datasets: [
      {
        label: label,
        data: data.map((item) => item[dataKey]),
        backgroundColor: backgroundColor.slice(0, data.length),
        hoverOffset: 4,
      },
    ],
  };
  return <Doughnut data={chartdata} />;
}

export default ChartDouqhut;
