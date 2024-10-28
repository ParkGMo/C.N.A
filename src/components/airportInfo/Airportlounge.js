import React, { useEffect } from "react";

function Airportlounge(props) {
  const handleload = async () => {
    const api = `3uV1glFcu16EEfom2KpoJ4u%2BMLT6tdPXRrpCDmu3%2BI2VwJf0YHH9wfoR5Ivst9F8dAxRXrsROofN1FmukSPjmA%3D%3D`;
    const url = `https://api.odcloud.kr/api/15002711/v1/uddi:37ebe8d5-268f-4b25-a967-c64c586fdda3?page=1&perPage=10&serviceKey=${api}`;
    const lounge = await fetch(url).then((res) => res.json());
    console.log(lounge);
    // fetch(`https: //infuser.odcloud.kr/oas/docs?namespace=15002711/v1`).then(
    //   (respone) => {
    //     console.log(respone.text());
    //   }
    // );
  };
  useEffect(() => {
    handleload();
  }, []);
  return <div>Airportlounge</div>;
}

export default Airportlounge;
