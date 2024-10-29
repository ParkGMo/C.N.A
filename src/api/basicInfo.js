import { getXmlToJson } from '../utils/getXmlToJson';

const URL = 'http://apis.data.go.kr/1262000';
const SERVICE_KEY =
  '%2BUjyuVkbInMr7Tkmumw5Lb87wtQ1ndK3qPSUaX7TRXySfHboo8MS5A%2BLHgjHzfD5K0BAYcDcu1wIQv2t1HQxGw%3D%3D';

// 국가별 기본정보 api
export async function basicInfoData(isoCode) {
  const reqURL = `${URL}/CountryBasicService/getCountryBasicList?serviceKey=${SERVICE_KEY}&numOfRows=10&pageNo=1&isoCode1=${isoCode}`;

  const result = await fetch(reqURL);
  const textResult = await result.text();

  let xmlString = new DOMParser().parseFromString(textResult, 'text/xml');
  const jsonResult = getXmlToJson(xmlString).response.body.items.item;

  return jsonResult;
}

// 국가별 현지연락처 api
export async function localContactInfoData(isoCode) {
  const reqUrl = `${URL}/LocalContactService2/getLocalContactList2?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=10&cond[country_iso_alp2::EQ]=${isoCode}`;

  const response = await fetch(reqUrl);
  const jsonData = await response.json();
  const result = await jsonData.data[0];

  return result;
}

// 국가별 치안환경 api (여행경보)
export async function securityEnvInfoData(isoCode) {
  const reqUrl = `${URL}/SecurityEnvironmentService/getSecurityEnvironmentList?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=10&cond[country_iso_alp2::EQ]=${isoCode}`;

  const response = await fetch(reqUrl);
  const jsonData = await response.json();
  const result = await jsonData.data[0];

  return result;
}
