import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { monthMap } from "../../lib/changeNames.js";

// 해시 함수: 문자열을 기반으로 고유한 색상 값 생성
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash); // 문자열을 해시화
  }

  // 해시 값을 사용해 색상을 생성
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;
  const alpha = 0.5;
  return `rgb(${r}, ${g}, ${b}, ${alpha})`;
};

function ChartBar({ data }) {
  // 데이터에서 월별 키를 추출 (행선국 제외)
  const months = Object.keys(monthMap);

  // 각 나라별 데이터셋 준비
  const datasets = data
    .map((destination) => {
      // destination.date가 배열인지 확인
      if (!Array.isArray(destination.date)) {
        console.error("Invalid date format in destination data:", destination);
        return null; // 데이터가 유효하지 않으면 null 반환
      }

      const countryData = destination.date.reduce((acc, monthData) => {
        if (typeof monthData === "object") {
          // 월별 데이터를 제대로 처리하기 위해 `monthData`가 객체여야 함
          for (const month in monthData) {
            if (monthData[month]) {
              acc.push(monthData[month]); // 월별 데이터값을 배열에 추가
            } else {
              acc.push(0); // 데이터가 없으면 0으로 채움
            }
          }
        } else {
          // 예상된 형식이 아니면 경고 메시지 출력
          console.warn("Unexpected monthData format:", monthData);
        }
        return acc;
      }, []);

      // 데이터셋 생성
      return {
        label: destination.country, // 나라 이름
        data: countryData, // 각 월에 대한 값
        backgroundColor: stringToColor(destination.country), // 고정된 색상 생성
        borderColor: stringToColor(destination.country), // 고정된 색상 생성
        borderWidth: 1, // 테두리 두께
      };
    })
    .filter((dataset) => dataset !== null); // null값을 가진 데이터는 제외

  // 차트 데이터 설정
  const chartData = {
    labels: months, // x축 레이블로 월 사용
    datasets: datasets, // 위에서 준비한 데이터셋
  };

  // 차트 옵션 설정
  const options = {
    scales: {
      y: {
        beginAtZero: true, // y축이 0부터 시작하도록 설정
      },
    },
  };

  return <Bar data={chartData} />;
}

export default ChartBar;
