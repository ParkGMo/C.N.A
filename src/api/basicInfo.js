// 나라별 기본정보 api

import { getXmlToJson } from '../utils/getXmlToJson';

const url = `http://apis.data.go.kr/1262000/CountryBasicService/getCountryBasicList`;
const key =
  '%2BUjyuVkbInMr7Tkmumw5Lb87wtQ1ndK3qPSUaX7TRXySfHboo8MS5A%2BLHgjHzfD5K0BAYcDcu1wIQv2t1HQxGw%3D%3D';

export async function basicInfoData(isoCode) {
  const reqURL = `${url}?serviceKey=${key}&numOfRows=10&pageNo=1&isoCode1=${isoCode}`;

  const result = await fetch(reqURL);
  const textResult = await result.text();

  let xmlString = new DOMParser().parseFromString(textResult, 'text/xml');
  const jsonResult = getXmlToJson(xmlString).response.body.items.item;

  return jsonResult;
}
