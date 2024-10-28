import { getXmlToJson } from '../utils/getXmlToJson';

// 국가별 기본정보 api
const basic_info_url =
  'http://apis.data.go.kr/1262000/CountryBasicService/getCountryBasicList';
const basic_info_key =
  '%2BUjyuVkbInMr7Tkmumw5Lb87wtQ1ndK3qPSUaX7TRXySfHboo8MS5A%2BLHgjHzfD5K0BAYcDcu1wIQv2t1HQxGw%3D%3D';

export async function basicInfoData(isoCode) {
  const reqURL = `${basic_info_url}?serviceKey=${basic_info_key}&numOfRows=10&pageNo=1&isoCode1=${isoCode}`;

  const result = await fetch(reqURL);
  const textResult = await result.text();

  let xmlString = new DOMParser().parseFromString(textResult, 'text/xml');
  const jsonResult = getXmlToJson(xmlString).response.body.items.item;

  return jsonResult;
}

// 국가별 현지연락처 api
const local_contact_info_url =
  'http://apis.data.go.kr/1262000/LocalContactService2/getLocalContactList2';
const local_contact_info_key =
  '%2BUjyuVkbInMr7Tkmumw5Lb87wtQ1ndK3qPSUaX7TRXySfHboo8MS5A%2BLHgjHzfD5K0BAYcDcu1wIQv2t1HQxGw%3D%3D';

export async function localContactInfoData(isoCode) {
  const reqUrl = `${local_contact_info_url}?serviceKey=${local_contact_info_key}&pageNo=1&numOfRows=10&cond[country_iso_alp2::EQ]=${isoCode}`;

  const response = await fetch(reqUrl);
  const jsonData = await response.json();
  const result = await jsonData.data[0];

  return result;
}

// 국가별 치안환경 api (여행경보)
const security_environment_url =
  'http://apis.data.go.kr/1262000/SecurityEnvironmentService/getSecurityEnvironmentList';
const security_environment_key =
  '%2BUjyuVkbInMr7Tkmumw5Lb87wtQ1ndK3qPSUaX7TRXySfHboo8MS5A%2BLHgjHzfD5K0BAYcDcu1wIQv2t1HQxGw%3D%3D';

export async function securityEnvInfoData(isoCode) {
  const reqUrl = `${security_environment_url}?serviceKey=${security_environment_key}&pageNo=1&numOfRows=10&cond[country_iso_alp2::EQ]=${isoCode}`;

  const response = await fetch(reqUrl);
  const jsonData = await response.json();
  const result = await jsonData.data[0];

  return result;
}
