import React, { useEffect, useState } from "react";
import { randomCountryName } from "../../utils/randomCountryName";
import Search from "../search/Search";
import { convertCodeISO2 } from "../../lib/convertIsoCode";
import LocationTime from "./LocationTime";
import styles from "./CountryTime.module.scss";

function CountryTime() {
  const [value, setValue] = useState(randomCountryName());
  const [ISO2, setISO2] = useState("");
  const [lat, setLat] = useState(36.328799);
  const [lon, setLon] = useState(127.4230707);
  const DAY = new Date();
  const HOUR = DAY.getHours();
  const MINUTE = DAY.getMinutes();
  // const [nowLat, setNowLat] = useState(36.328799);
  // const [nowLon, setNowLon] = useState(127.4230707);
  const [searchResult, setSearchResult] = useState({});
  // const [nowResult, setNowResult] = useState({});
  // 현재 위치 기반 시간
  // const handleLoad1 = async () => {
  //   const url = `https://timeapi.io/api/time/current/coordinate?latitude=${nowLat}&longitude=${nowLon}`;
  //   try {
  //     const response = await fetch(url);
  //     const result = await response.json();
  //     setNowResult(result);
  //   } catch (error) {}
  // };
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
      setLat(result[1][0]?.latitude);
      setLon(result[1][0]?.longitude);
    } catch (error) {
      console.error(error);
    }
  };
  // const getNowLatLon = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const nowLat = position.coords.latitude;
  //       setNowLat(nowLat);
  //       const nowLon = position.coords.longitude;
  //       setNowLon(nowLon);
  //     },
  //     (error) => {
  //       console.error("Error fetching location:", error);
  //     }
  //   );
  // };

  useEffect(() => {
    // handleLoad1();
    handleLoad2();
    changeISO(value);
    getLatLon();
    // getNowLatLon();
  }, [value, lat, lon]);
  return (
    <div>
      <Search value={value} setValue={setValue} />
      <div className={styles.timeCards}>
        <div className={styles.timeCard}>
          <LocationTime />
        </div>
        <div className={styles.timeCard}>
          <div>
            <h5>선택 위치</h5>
            <p>{searchResult.dateTime?.split("T")[0].replaceAll("-", " : ")}</p>
            <p>{searchResult.timeZone}</p>
          </div>
        </div>
      </div>
      <div className={styles.TimeDifferent}>
        시차 : {HOUR - searchResult.hour}H {MINUTE - searchResult.minute}M
      </div>
    </div>
  );
}

export default CountryTime;
