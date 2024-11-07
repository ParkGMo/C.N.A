import React, { useEffect, useState } from "react";
import { randomCountryName } from "../../utils/randomCountryName";
import { convertCodeISO2 } from "../../lib/convertIsoCode";

function LocationTime() {
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
  const getNowLatLon = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nowLat = position.coords.latitude;
        setLat(nowLat);
        const nowLon = position.coords.longitude;
        setLon(nowLon);
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  };
  useEffect(() => {
    handleLoad();
    changeISO(value);
    getNowLatLon();
  }, [value, lat, lon]);
  return (
    <div>
      <div>
        <h5>현재 위치</h5>
        <p>{result.dateTime?.split("T")[0].replaceAll("-", " : ")}</p>
        <p>{result.timeZone}</p>
      </div>
    </div>
  );
}

export default LocationTime;
