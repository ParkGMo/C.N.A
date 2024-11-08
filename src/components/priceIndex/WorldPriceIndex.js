import React, { useEffect, useState } from "react";
import Search from "../search/Search";
import { randomCountryName } from "../../utils/randomCountryName";
import { convertCodeISO2 } from "../../lib/convertIsoCode";

function WorldPriceIndex() {
  const [value, setValue] = useState(randomCountryName());
  const [priceIndexList, setPriceIndexList] = useState([]);
  const [ISO2, setISO2] = useState("");
  const DATE = new Date();
  const Year = DATE.getFullYear();
  console.log(priceIndexList.slice(0, 9));

  const changeISO = (value) => {
    const resultISO = convertCodeISO2(value);
    setISO2(resultISO);
  };
  const handleLoad = async () => {
    // const ISO2 = `KR`;
    //   https://datahelpdesk.worldbank.org/knowledgebase/topics/125589
    const url = `https://api.worldbank.org/v2/country/${ISO2}/indicator/FP.CPI.TOTL?format=json`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setPriceIndexList(result[1]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleLoad();
    changeISO(value);
  }, [value, ISO2]);
  return (
    <div>
      <Search value={value} setValue={setValue} />
      WorldPriceIndex
      {priceIndexList?.slice(0, 9).map((item, idx) => {
        return (
          <div key={idx}>
            {item.country.value}
            {` `}
            <span>
              {item.date}year : {item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default WorldPriceIndex;
