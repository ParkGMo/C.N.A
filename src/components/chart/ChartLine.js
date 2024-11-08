import React from "react";
import { Line } from "react-chartjs-2";
import { monthMap } from "../../lib/changeNames.js"; // monthMap 임포트
import { stringToColor } from "../../utils/uniqueColour.js";

// 문자열을 색상으로 변환하는 함수
// const stringToColor = (str) => {
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     hash = str.charCodeAt(i) + ((hash << 5) - hash); // 문자열을 해시화
//   }

// 해시 값을 사용해 색상을 생성
//   const r = (hash & 0xff0000) >> 16;
//   const g = (hash & 0x00ff00) >> 8;
//   const b = hash & 0x0000ff;
//   const alpha = 0.5;
//   return `rgb(${r}, ${g}, ${b}, ${alpha})`;
// };

function ChartLine({ data, labels }) {
  // labels => x축
  // ex data =  [{dataSet1:[1,2,3,4] }, {dataSet2:[1,2,3,4,5]}, {dataSet3:[1,2,3,4]}...]
  const datasets = data.map((item) => {
    // const datasets = data.map((countryData) => {
    // const monthData = months.map((month) => {
    //   const monthObj = countryData.date.find(
    //     (item) => Object.keys(item)[0] === monthMap[month]
    //   );
    //   return monthObj ? Object.values(monthObj)[0] : 0;
    // });
    const label = Object.keys(item);
    return {
      label: label,
      data: item[label],
      borderColor: stringToColor(label),
      backgroundColor: stringToColor(label),
      fill: false, // 배경색을 채우지 않도록 설정
    };
  });

  const chartData = {
    labels: labels, // x축 레이블을 monthMap의 키값으로 설정
    datasets: datasets, // 준비한 데이터셋
  };

  return <Line data={chartData} />;
}

export default ChartLine;
