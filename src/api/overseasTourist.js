// const URL =
//   'http://openapi.tour.go.kr/openapi/service/EdrcntTourismStatsService/getOvseaTuristStatsList';

import { getXmlToJson } from '../utils/getXmlToJson';

// const URL = 'openapi/service/EdrcntTourismStatsService/getOvseaTuristStatsList';
const SERVICE_KEY =
  '%2BUjyuVkbInMr7Tkmumw5Lb87wtQ1ndK3qPSUaX7TRXySfHboo8MS5A%2BLHgjHzfD5K0BAYcDcu1wIQv2t1HQxGw%3D%3D';

// 국민해외관광객통계
export async function overseasTouristData(yyyymm, portCode) {
  const reqURL = `/overseasTourists?serviceKey=${SERVICE_KEY}&YM=${yyyymm}&PORT_CD=${portCode}&numOfRows=20`;

  const result = await fetch(reqURL);

  if (!result.ok) {
    console.error('Failed to fetch:', result.status, result.statusText);
    return;
  }

  const textResult = await result.text();

  let xmlString = new DOMParser().parseFromString(textResult, 'text/xml');
  const jsonResult = getXmlToJson(xmlString).response.body.items.item;

  return jsonResult;
}
