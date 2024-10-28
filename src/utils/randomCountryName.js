const countryNameList = [
  '중국',
  '일본',
  '러시아',
  '인도',
  '태국',
  '프랑스',
  '영국',
  '아일랜드',
  '스페인',
  '스웨덴',
  '포르투갈',
  '노르웨이',
  '덴마크',
  '아이슬란드',
  '미국',
  '이탈리아',
  '캐나다',
  '브라질',
];

export function randomCountryName() {
  const randNum = Math.floor(Math.random() * countryNameList.length);

  return countryNameList[randNum];
}
