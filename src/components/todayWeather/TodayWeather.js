import React, { useEffect, useState } from "react";
import { randomCountryName } from "../../utils/randomCountryName";
import Search from "../search/Search";
import { convertCodeISO2 } from "../../lib/convertIsoCode";
import styles from "./TodayWeather.module.scss";
const initialData = {
  coord: {
    lon: 7.367,
    lat: 45.133,
  },
  weather: [
    {
      id: 501,
      main: "Rain",
      description: "moderate rain",
      icon: "10d",
    },
  ],
  base: "stations",
  main: {
    temp: 284.2,
    feels_like: 282.93,
    temp_min: 283.06,
    temp_max: 286.82,
    pressure: 1021,
    humidity: 60,
    sea_level: 1021,
    grnd_level: 910,
  },
  visibility: 10000,
  wind: {
    speed: 4.09,
    deg: 121,
    gust: 3.47,
  },
  rain: {
    "1h": 2.73,
  },
  clouds: {
    all: 83,
  },
  dt: 1726660758,
  sys: {
    type: 1,
    id: 6736,
    country: "IT",
    sunrise: 1726636384,
    sunset: 1726680975,
  },
  timezone: 7200,
  id: 3165523,
  name: "Province of Turin",
  cod: 200,
};

function TodayWeather() {
  const [value, setValue] = useState(randomCountryName());
  const [ISO2, setISO2] = useState("");
  const [lat, setLat] = useState(36.328799);
  const [lon, setLon] = useState(127.4230707);
  const [weatherData, setWeatherData] = useState(initialData);
  const handleLoad = async () => {
    const apiKey = `6e3669d9ce0d4e84eddd41c90c38ab37`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setWeatherData(result);
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
      <div className={styles.weatherCard}>
        <div className={styles.weatherItem}>
          <div className={styles.weatherCountry}>
            {weatherData ? value : ""}
            <span> {weatherData?.name}</span>
          </div>
          <div className={styles.weatherIcon}>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0].icon}@2x.png`}
            />
          </div>
          <div className={styles.weatherTemp}>
            현재온도 : {weatherData?.main.temp}
          </div>
          <div className={styles.weatherMaxMin}>
            {weatherData?.main.temp_min}/{weatherData?.main.temp_max}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayWeather;
