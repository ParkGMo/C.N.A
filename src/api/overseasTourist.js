import { getXmlToJson } from '../utils/getXmlToJson';

const URL =
  'http://openapi.tour.go.kr/openapi/service/EdrcntTourismStatsService/getOvseaTuristStatsList';
const SERVICE_KEY =
  '%2BUjyuVkbInMr7Tkmumw5Lb87wtQ1ndK3qPSUaX7TRXySfHboo8MS5A%2BLHgjHzfD5K0BAYcDcu1wIQv2t1HQxGw%3D%3D';

// 국민해외관광객통계
export async function overseasTouristData(ym) {
  const reqURL = `${URL}?YM=${ym}&serviceKey=${SERVICE_KEY}`;

  const result = await fetch(reqURL);
  const textResult = await result.text();

  let xmlString = new DOMParser().parseFromString(textResult, 'text/xml');
  const jsonResult = getXmlToJson(xmlString).response.body.items.item;

  return jsonResult;
}
