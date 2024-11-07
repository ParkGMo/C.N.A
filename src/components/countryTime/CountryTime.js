import React, { useEffect, useState } from "react";
import { randomCountryName } from "../../utils/randomCountryName";
import Search from "../search/Search";
import { convertCodeISO2 } from "../../lib/convertIsoCode";

function CountryTime() {
  const [value, setValue] = useState(randomCountryName());
  const [ISO2, setISO2] = useState("");
  const [lat, setLat] = useState(36.328799);
  const [lon, setLon] = useState(127.4230707);
  const [nowLat, setNowLat] = useState(36.328799);
  const [nowLon, setNowLon] = useState(127.4230707);
  const [searchResult, setSearchResult] = useState({});
  const [nowResult, setNowResult] = useState({});
  // 현재 위치 기반 시간
  const handleLoad1 = async () => {
    const url = `https://timeapi.io/api/time/current/coordinate?latitude=${nowLat}&longitude=${nowLon}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setNowResult(result);
    } catch (error) {}
  };
  // 검색한 위치 기반 시간
  const handleLoad2 = async () => {
    const url = `https://timeapi.io/api/time/current/coordinate?latitude=${lat}&longitude=${lon}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setSearchResult(result);
    } catch (error) {}
  };
  const changeISO = (value) => {
    const resultISO = convertCodeISO2(value);
    setISO2(resultISO);
  };
  const getLatLon = async () => {
    const url = `https://api.worldbank.org/v2/country/${ISO2}?format=json`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      // console.log(result[1][0]);
      setLat(result[1][0]?.latitude);
      setLon(result[1][0]?.longitude);
    } catch (error) {
      console.error(error);
    }
  };
  const getNowLatLon = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nowLat = position.coords.latitude;
        setNowLat(nowLat);
        const nowLon = position.coords.longitude;
        setNowLon(nowLon);
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  };

  useEffect(() => {
    handleLoad1();
    handleLoad2();
    changeISO(value);
    getLatLon();
    getNowLatLon();
  }, [value, lat, lon]);
  return (
    <div>
      <Search value={value} setValue={setValue} />
      <div>
        <div>
          <h3>현재 위치</h3>
          <p>
            {nowResult.formattedTime}
            {nowResult.timezone}
          </p>
        </div>
        <div>
          <h3>검색 위치</h3>
          <p>
            {searchResult.formattedTime}
            {searchResult.timezone}
          </p>
        </div>
      </div>
      CountryTime
    </div>
  );
}

export default CountryTime;
