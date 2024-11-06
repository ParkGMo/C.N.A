import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

// API로부터 국가 정보를 가져오는 함수
const fetchCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    console.log("API Response:", response.data); // API 응답 로그
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

function Map() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([0, 20]); // 초기 중심 좌표

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      console.log("Fetched Countries:", data); // 국가 데이터 로그
      console.log("Countries Length:", data.length); // 국가 수 로그
      data.forEach((country) => {
        console.log("Country:", country.name.common); // 각 국가 정보 로그
      });
      setCountries(data);
    };
    getCountries(); // 컴포넌트가 마운트될 때 API 호출
  }, []);

  const handleCountryClick = (geo) => {
    console.log("Clicked Geography:", geo); // 클릭한 Geography 정보 출력
    const country = countries.find((c) => c.cca3 === geo.id);
    console.log("Geo ID:", geo.id); // Geo ID 출력
    console.log("Country Found:", country); // 찾은 국가 정보 출력

    if (country) {
      setSelectedCountry(country);
      setCenter(country.latlng); // 국가의 중앙 좌표로 이동
      setZoom(3); // 줌 레벨 조정
    } else {
      console.log("Country not found"); // 국가가 발견되지 않았을 경우
    }
  };

  return (
    <div>
      <h2>World Map with Countries</h2>
      <ComposableMap
        projectionConfig={{
          scale: 150,
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup center={center} zoom={zoom}>
          <Geographies geography="https://unpkg.com/world-atlas@1/world/110m.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo)} // 클릭 시 핸들러 호출
                    style={{
                      default: { fill: "#D6D6DA", outline: "none" },
                      hover: { fill: "#FF5533", outline: "none" },
                      pressed: { fill: "#E42", outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* 선택된 국가의 경계 표시 */}
          {selectedCountry && (
            <Geography
              geography={`https://unpkg.com/world-atlas@1/countries/${selectedCountry.cca2.toLowerCase()}.json`}
              style={{
                default: { fill: "#000", outline: "none" },
                hover: { fill: "#FF5533", outline: "none" },
                pressed: { fill: "#E42", outline: "none" },
              }}
            />
          )}
        </ZoomableGroup>
      </ComposableMap>

      {selectedCountry && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Country: {selectedCountry.name.common}</h3>
          <p>
            <strong>Capital:</strong> {selectedCountry.capital?.[0]}
          </p>
          <p>
            <strong>Population:</strong> {selectedCountry.population}
          </p>
          <p>
            <strong>Area:</strong> {selectedCountry.area} km²
          </p>
          <p>
            <strong>Region:</strong> {selectedCountry.region}
          </p>
          <p>
            <strong>Subregion:</strong> {selectedCountry.subregion}
          </p>
          <img
            src={selectedCountry.flags.png}
            alt={`Flag of ${selectedCountry.name.common}`}
            width={100}
          />
        </div>
      )}
    </div>
  );
}

export default Map;
