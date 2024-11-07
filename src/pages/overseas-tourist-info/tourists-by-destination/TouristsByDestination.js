import React, { useEffect, useState } from 'react';
import ChartBar from '../../../components/chart/ChartBar';
import { monthMap } from '../../../lib/changeNames';
import {
  localTraveler2019,
  localTraveler2023,
  localTraveler2024,
} from '../../../lib/overseasDestinationData';

function TouristsByDestination({ country }) {
  // country props : Intro 컴포넌트에서 받아오는 value (검색어)

  const [selectedYear, setSelectedYear] = useState('2024년');
  const [data, setData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState(
    country ? [country] : []
  ); // country props가 있다면, 기본적으로 country props를 넣고 아니면 빈 배열 처리

  const loadData = (year) => {
    switch (year) {
      case '2019년':
        return localTraveler2019();
      case '2023년':
        return localTraveler2023();
      case '2024년':
        return localTraveler2024();
      default:
        return [];
    }
  };

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
        backgroundColor: 'rgba(75, 192, 192, 0.4)', // 임의의 색상
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      };
    }),
  };

  useEffect(() => {
    setData(loadData(selectedYear));
  }, [selectedYear]);

  // Intro 컴포넌트용 useEffect
  // => 검색어와 차트 연동
  useEffect(() => {
    if (country) {
      setSelectedCountries([country]);
    }
  }, [country]);

  return (
    <div>
      <h1>국가별 출국자 수</h1>
      {!country && (
        // country props가 없을 경우에만 국가 선택을 렌더링한다.
        // 즉, Intro 컴포넌트에서는 국가 선택을 숨김.
        // => Intro에서 랜덤으로 나오는 국가에 대한 정보만 렌더링하기 위해
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
              <option disabled>데이터가 없습니다.</option>
            )}
          </select>
        </div>
      )}

      {selectedCountries.length > 0 && filteredData.length > 0 ? (
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
          <ChartBar data={chartData} />
        </div>
      ) : selectedCountries.length > 0 && filteredData.length === 0 ? (
        // 차트 데이터가 없을 경우
        <p>해당 국가에 대한 정보가 없습니다.</p>
      ) : (
        // 국가 선택을 안했을 경우
        <p>국가를 선택해주세요!</p>
      )}
    </div>
  );
}

export default TouristsByDestination;
