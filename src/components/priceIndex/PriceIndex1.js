import React, { useEffect } from "react";

function PriceIndex1() {
  const handleLoad = async () => {
    const apiKey = `3enTQKFbdwp7mY5McRmHelO8xxgi4LDBLefpQOsKT06WUGR3F4IhllVUPd90RuALzzzNTQuQfCGvK70tMyjJVA%3D%3D`;
    const url = `https://dream.kotra.or.kr/openapi/priceInfoByNatn?serviceKey=${apiKey}&type=json&numOfRows=250&pageNo=1&prcsCritSeq=1&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result.response.body.itemList.item);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return <div>PriceIndex1</div>;
}

export default PriceIndex1;
