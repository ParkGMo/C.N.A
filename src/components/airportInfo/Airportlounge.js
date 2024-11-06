import React, { useState, useEffect } from "react";
import {
  localTraveler2019,
  localTraveler2023,
  localTraveler2024,
} from "../../lib/overseasDestinationData";
import ChartLine from "../chart/ChartLine"; // 이전에 작성한 ChartLine 컴포넌트
import ChartBar from "../chart/ChartBar";
import ChartDouqhut from "../chart/ChartDouqhut";

function AirportLounge() {
  const [selectedYear, setSelectedYear] = useState("2019년"); // 초기값은 2019년
  const [data, setData] = useState([]);
  console.log(data);
  const [selectedCountries, setSelectedCountries] = useState([]);

  // 년도별 데이터 로딩 함수
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
    const loadedData = loadData(selectedYear);
    setData(loadedData); // 데이터를 상태에 저장
  }, [selectedYear]);

  // 국가 선택 핸들러
  const handleCountrySelection = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedCountries(selectedOptions);
  };

  // 선택된 국가와 년도에 맞는 데이터 필터링
  const filteredData = data.filter((item) =>
    selectedCountries.includes(item.country)
  );

  return (
    <div>
      <h1>국가별 출국자 수</h1>

      {/* 국가 선택 (드롭다운) */}
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

      {/* 년도 선택 (드롭다운) */}
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

      {/* 차트 컴포넌트 */}
      {selectedCountries.length > 0 && (
        // <ChartLine
        //   data={filteredData}
        //   label={`출국자 수 (${selectedYear})`}
        //   dataKey="date" // 월별 데이터를 기반으로 그리기
        // />
        <ChartBar data={filteredData} />
        // <ChartDouqhut data={filteredData} />
      )}
    </div>
  );
}

export default AirportLounge;
