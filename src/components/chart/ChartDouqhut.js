import React from "react";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

// stringToColor 함수: label 문자열을 기반으로 색상 생성
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;
  return `rgba(${r}, ${g}, ${b}, 0.5)`;
};

function ChartDouqhut({ data }) {
  // `data` prop을 활용한 차트 데이터 구성
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: stringToColor(dataset.label),
      borderColor: stringToColor(dataset.label),
      hoverOffset: 4,
    })),
  };

  // 기본 옵션 설정
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Doughnut data={chartData} options={options} />;
}

export default ChartDouqhut;
