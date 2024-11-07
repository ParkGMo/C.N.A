import React, { useState, useEffect } from "react";
import ChartBar from "../chart/ChartBar"; // Bar 차트 컴포넌트 임포트

function Overseas() {
  const [loungeData, setLoungeData] = useState([]); // 공항 데이터 상태
  const [selectedAirport, setSelectedAirport] = useState(""); // 선택된 공항
  const [filteredLoungeData, setFilteredLoungeData] = useState([]); // 필터링된 공항 데이터

  // 공항 데이터 로딩
  const handleload = async () => {
    const api = `3uV1glFcu16EEfom2KpoJ4u%2BMLT6tdPXRrpCDmu3%2BI2VwJf0YHH9wfoR5Ivst9F8dAxRXrsROofN1FmukSPjmA%3D%3D`;
    const url = `https://api.odcloud.kr/api/15002711/v1/uddi:37ebe8d5-268f-4b25-a967-c64c586fdda3?page=1&perPage=10&serviceKey=${api}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("API 응답:", data); // 응답 구조 확인

      // 응답 객체에서 'data' 속성에 있는 실제 배열을 상태에 저장
      if (data && Array.isArray(data.data)) {
        setLoungeData(data.data); // 응답에서 data.data에 배열 저장
      } else {
        console.error("응답이 예상한 배열이 아닙니다.", data);
      }
    } catch (error) {
      console.error("공항 데이터 로드 실패:", error);
    }
  };

  useEffect(() => {
    handleload(); // 컴포넌트가 마운트되었을 때 공항 데이터 로딩
  }, []);

  // 공항 선택 핸들러
  const handleAirportSelection = (event) => {
    const airport = event.target.value;
    setSelectedAirport(airport);

    // 선택된 공항 데이터 필터링
    const filteredData = loungeData.filter(
      (airportData) => airportData["공항"] === airport
    );
    setFilteredLoungeData(filteredData);
  };

  // 차트 데이터 생성
  const chartData = {
    labels: ["발권데스크", "셀프체크인 키오스크", "카운터", "컨베이어벨트"], // x축에 세 가지 항목
    datasets:
      filteredLoungeData.length > 0
        ? filteredLoungeData.map((airport) => ({
            label: airport["공항"], // 공항 이름을 레이블로 사용
            data: [
              airport["발권데스크"] || 0,
              airport["셀프체크인 키오스크"] || 0,
              airport["카운터"] || 0,
              airport["컨베이어벨트"] || 0,
            ],
            backgroundColor: "rgba(75,192,192,0.4)", // 차트 색상
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          }))
        : [],
  };

  return (
    <div>
      <h1>공항 정보</h1>

      {/* 공항 선택 (드롭다운) */}
      <div>
        <h3>공항 선택:</h3>
        <select value={selectedAirport} onChange={handleAirportSelection}>
          {/* 공항 데이터가 있으면 목록을 출력 */}
          {loungeData.length > 0 ? (
            loungeData.map((airport) => (
              <option key={airport["공항"]} value={airport["공항"]}>
                {airport["공항"]}
              </option>
            ))
          ) : (
            <option disabled>공항 데이터가 없습니다</option> // 데이터가 없을 경우
          )}
        </select>
      </div>

      {/* 선택된 공항에 대한 차트 표시 */}
      {filteredLoungeData.length > 0 ? (
        <ChartBar data={chartData} /> // data를 전달합니다.
      ) : (
        <p>공항을 선택해주세요.</p> // 데이터가 없으면 메시지 표시
      )}
    </div>
  );
}

export default Overseas;
