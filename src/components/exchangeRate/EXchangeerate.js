import React, { useEffect } from "react";

function EXchangeerate() {
  const handleLoad = async () => {
    const apiKey = `ee62caae71f971b99caa6194`;
    const current = "KRW";
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${current}`;
    //   https://app.exchangerate-api.com/dashboard/confirmed
    //   https://v6.exchangerate-api.com/v6/ee62caae71f971b99caa6194/codes 화폐단위 - 나라별
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return <div>EXchangeerate</div>;
}

export default EXchangeerate;
