import React from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import "chart.js/auto";

function ChartPyramid({ data }) {
  const transformedLabels = data.labels.map((label) => {
    return `${label}대`;
  });

  const chartData = {
    labels: transformedLabels,
    datasets: [
      {
        label: "남성",
        data: data.maleData.map((value) => -value), // 남성 데이터를 음수로 변환하여 왼쪽에 표시
        backgroundColor: "rgba(54, 162, 235, 0.7)", // 파란색
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        stack: "population", // 남성과 여성을 동일한 스택으로 설정
      },
      {
        label: "여성",
        data: data.femaleData, // 여성 데이터를 양수로 유지하여 오른쪽에 표시
        backgroundColor: "rgba(255, 99, 132, 0.7)", // 분홍색
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        stack: "population", // 남성과 여성을 동일한 스택으로 설정
      },
    ],
  };

  const options = {
    indexAxis: "y", // 가로 막대 그래프로 변경
    scales: {
      x: {
        grid: {
          display: false, // x축에 대한 그리드 선 제거
        },
        beginAtZero: true,
        stacked: true, // x축을 스택 모드로 설정하여 데이터를 연령대 기준으로 배치
        ticks: {
          callback: (value) => Math.abs(value), // x축에 절대값을 표시
        },
      },
      y: {
        beginAtZero: true,
        reverse: true, // y축을 역순으로 설정하여 10대가 아래쪽에 표시되도록 설정
        grid: {
          display: false, // y축에 대한 그리드 선 제거
        },
        ticks: {
          align: "center", // 연령대 레이블을 중앙에 정렬
          padding: 5, // 연령대와 차트 막대 간의 간격
          font: {
            size: 10, // 레이블 폰트 크기 조절
            weight: "bold",
          },
        },
        // position: "left", // y축 레이블을 차트의 중앙에 배치
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            // 툴팁에서 값의 절대값을 표시
            return `${context.dataset.label}: ${Math.abs(context.raw)}`;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default ChartPyramid;
