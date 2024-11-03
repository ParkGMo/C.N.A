import React, { useEffect, useState } from "react";
import ChartBar from "../chart/ChartBar";
import ChartDouqhut from "../chart/ChartDouqhut";
import ChartLine from "../chart/ChartLine";

function Airportlounge(props) {
  const [loungeData, setLoungeData] = useState([]);
  console.log(loungeData);

  const handleload = async () => {
    const api = `3uV1glFcu16EEfom2KpoJ4u%2BMLT6tdPXRrpCDmu3%2BI2VwJf0YHH9wfoR5Ivst9F8dAxRXrsROofN1FmukSPjmA%3D%3D`;
    const url = `https://api.odcloud.kr/api/15002711/v1/uddi:37ebe8d5-268f-4b25-a967-c64c586fdda3?page=1&perPage=10&serviceKey=${api}`;
    const lounge = await fetch(url).then((res) => res.json());
    setLoungeData(lounge.data);
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
  const datasets = [
    {
      label: "발권데스크",
      dataKey: "발권데스크",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "셀프체크인 키오스크",
      dataKey: ["셀프체크인 키오스크"],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
    },
    {
      label: "카운터",
      dataKey: "카운터",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    {
      label: "컨베이어벨트",
      dataKey: "컨베이어벨트",
      backgroundColor: "rgb(100, 255, 218, 0.2)",
      borderColor: "rgb(100, 255, 218, 1)",
    },
  ];
  return (
    <div>
      Airportlounge
      {/* <ChartBar data={loungeData} datasets={datasets} /> */}
      {/* <ChartDouqhut
        data={loungeData}
        label={"셀프체크인 키오스크"}
        dataKey={"셀프체크인 키오스크"}
      /> */}
      {/* <ChartLine data={loungeData} label={"카운터"} dataKey={"카운터"} /> */}
    </div>
  );
}

export default Airportlounge;
