import React from "react";
import { Radar } from "react-chartjs-2";

function ChartRadar({ data }) {
  // `data` prop을 기반으로 차트 데이터 설정
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      // 성별에 따라 색상 지정
      backgroundColor:
        dataset.label === "Male"
          ? "rgba(54, 162, 235, 0.5)"
          : "rgba(255, 99, 132, 0.5)", // 파란색과 분홍색
      borderColor:
        dataset.label === "Male"
          ? "rgba(54, 162, 235, 1)"
          : "rgba(255, 99, 132, 1)", // 파란색과 분홍색 테두리
      borderWidth: 1,
      fill: true, // 차트 내 영역을 채웁니다.
    })),
  };

  // 기본 옵션 설정
  const options = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Radar data={chartData} options={options} />;
}

export default ChartRadar;
