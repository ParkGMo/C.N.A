import React from "react";
import { Line } from "react-chartjs-2";

function ChartLine({ data, label, dataKey }) {
  const chartdata = {
    labels: data.map((item) => item.label || item.공항),
    datasets: [
      {
        label: label,
        data: data.map((item) => item[dataKey]),
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };
  return <Line data={chartdata} />;
}

export default ChartLine;
