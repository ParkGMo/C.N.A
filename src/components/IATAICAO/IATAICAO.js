import React, { useEffect } from "react";

function IATAICAO() {
  const handleLoad = async () => {
    const url = "https://iata-and-icao-codes.p.rapidapi.com/airlines";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "23eeafc821msh7be001b9cf669b8p1fea80jsn801714754628",
        "x-rapidapi-host": "iata-and-icao-codes.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return <div>IATAICAO</div>;
}

export default IATAICAO;
