import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function ChartBar({ data }) {
  const chartData = {
    labels: data.map((item) => item.공항),
    datasets: [
      {
        label: "발권데스크",
        data: data.map((item) => item.발권데스크),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "셀프체크인 키오스크",
        data: data.map((item) => item["셀프체크인 키오스크"]),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "카운터",
        data: data.map((item) => item.카운터),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
      //   {
      //     label: "컨베이어벨트",
      //     data: data.map((item) => item.컨베이어벹트),
      //     backgroundColor: "rgba(50,)",
      //     borderColor: "rgba(75, 192, 192, 1)",
      //   },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default ChartBar;
