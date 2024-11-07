import React, { useEffect, useState } from "react";
import { randomCountryName } from "../../utils/randomCountryName";

function SearchTime() {
  const [value, setValue] = useState(randomCountryName());
  const [ISO2, setISO2] = useState("");
  const [lat, setLat] = useState(36.328799);
  const [lon, setLon] = useState(127.4230707);
  const [result, setResult] = useState({});
  const handleLoad = async () => {
    const url = `https://timeapi.io/api/time/current/coordinate?latitude=${lat}&longitude=${lon}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setResult(result);
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
  useEffect(() => {
    handleLoad();
    changeISO(value);
    getLatLon();
  }, [value, lat, lon]);
  return <div>SearchTime</div>;
}

export default SearchTime;
