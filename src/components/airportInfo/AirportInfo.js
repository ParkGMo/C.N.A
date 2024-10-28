import React, { useEffect } from "react";

function AirportInfo() {
  const handleLoad = async () => {
    const ICAO = `RK`;
    const IATA = `ICN`;
    const url = `https://airport-info.p.rapidapi.com/airport?iata=${IATA}&icao=${ICAO}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "23eeafc821msh7be001b9cf669b8p1fea80jsn801714754628",
        "x-rapidapi-host": "airport-info.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return <div>AirportInfo</div>;
}

export default AirportInfo;
