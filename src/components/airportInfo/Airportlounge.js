import React, { useState, useEffect } from "react";
import {
  localTraveler2019,
  localTraveler2023,
  localTraveler2024,
} from "../../lib/overseasDestinationData";
import ChartBar from "../chart/ChartBar";
import { monthMap } from "../../lib/changeNames"; // monthMap import

function AirportLounge() {
  const [selectedYear, setSelectedYear] = useState("2019년");
  const [data, setData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const loadData = (year) => {
    switch (year) {
      case "2019년":
        return localTraveler2019();
      case "2023년":
        return localTraveler2023();
      case "2024년":
        return localTraveler2024();
      default:
        return [];
    }
  };

  useEffect(() => {
    setData(loadData(selectedYear));
  }, [selectedYear]);

  const handleCountrySelection = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedCountries(selectedOptions);
  };

  const filteredData = data.filter((item) =>
    selectedCountries.includes(item.country)
  );

  const chartData = {
    labels: Object.keys(monthMap), // 'jan' ~ 'dec' 배열을 라벨로 사용
    datasets: filteredData.map((countryData) => {
      const monthlyData = new Array(12).fill(0);

      // 각 월 데이터를 monthlyData 배열의 올바른 위치에 삽입
      countryData.date.forEach((entry) => {
        const [month, value] = Object.entries(entry)[0];
        const monthIndex = Object.keys(monthMap).findIndex(
          (key) => monthMap[key] === month
        );
        if (monthIndex !== -1) {
          monthlyData[monthIndex] = value;
        }
      });

      return {
        label: countryData.country,
        data: monthlyData,
        backgroundColor: "rgba(75, 192, 192, 0.4)", // 임의의 색상
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      };
    }),
  };

  return (
    <div>
      <h1>국가별 출국자 수</h1>

      <div>
        <h3>국가 선택:</h3>
        <select
          multiple
          value={selectedCountries}
          onChange={handleCountrySelection}
        >
          {data.length > 0 ? (
            data.map((countryData) => (
              <option key={countryData.country} value={countryData.country}>
                {countryData.country}
              </option>
            ))
          ) : (
            <option disabled>데이터가 없습니다</option>
          )}
        </select>
      </div>

      <div>
        <h3>년도 선택:</h3>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="2019년">2019년</option>
          <option value="2023년">2023년</option>
          <option value="2024년">2024년</option>
        </select>
      </div>

      {selectedCountries.length > 0 && filteredData.length > 0 ? (
        <ChartBar data={chartData} />
      ) : (
        <p>국가를 선택하거나 데이터를 확인하세요.</p>
      )}
    </div>
  );
}

export default AirportLounge;
