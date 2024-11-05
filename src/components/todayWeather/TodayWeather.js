import React, { useEffect, useState } from "react";
import { randomCountryName } from "../../utils/randomCountryName";
import Search from "../search/Search";
import { convertCodeISO2 } from "../../lib/convertIsoCode";

function TodayWeather() {
  const [value, setValue] = useState(randomCountryName());
  const [ISO2, setISO2] = useState("");
  const [lat, setLat] = useState(36.328799);
  const [lon, setLon] = useState(127.4230707);
  const handleLoad = async () => {
    const apiKey = `6e3669d9ce0d4e84eddd41c90c38ab37`;
    // const lat = 36.328799;
    // const lon = 127.4230707;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
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
  useEffect(() => {
    handleLoad();
    changeISO(value);
    getLatLon();
  }, [value, lat]);
  return (
    <div>
      <Search value={value} setValue={setValue} />
      TodayWeather
    </div>
  );
}

export default TodayWeather;
