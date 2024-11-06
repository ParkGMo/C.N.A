import { getXmlToJson } from '../utils/getXmlToJson';

const URL = 'http://apis.data.go.kr/1262000';
const SERVICE_KEY =
  '%2BUjyuVkbInMr7Tkmumw5Lb87wtQ1ndK3qPSUaX7TRXySfHboo8MS5A%2BLHgjHzfD5K0BAYcDcu1wIQv2t1HQxGw%3D%3D';

// 국가별 기본정보, 현지연락처, 치안환경 공통 함수
export async function countryInfoData(isoCode, endPoint, baseParams) {
  let reqUrl;

  if (isoCode.length === 3) {
    const params = new URLSearchParams({
      ...baseParams,
      isoCode1: isoCode,
    });

    reqUrl = `${URL}/${endPoint}?serviceKey=${SERVICE_KEY}&${params.toString()}`;
  } else {
    const params = new URLSearchParams({
      ...baseParams,
      'cond[country_iso_alp2::EQ]': isoCode,
    });

    reqUrl = `${URL}/${endPoint}?serviceKey=${SERVICE_KEY}&${params.toString()}`;
  }

  const response = await fetch(reqUrl);

  if (!response.ok) {
    throw new Error('response was not ok');
  }

  if (endPoint.includes('getCountryBasicList')) {
    const textResult = await response.text();

    let xmlString = new DOMParser().parseFromString(textResult, 'text/xml');
    const jsonResult = getXmlToJson(xmlString).response.body.items.item;

    return jsonResult;
  } else {
    const jsonData = await response.json();
    const result = await jsonData.data[0];

    return result;
  }
}
