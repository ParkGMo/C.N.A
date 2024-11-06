import overseasDestination2019 from './overseasDestination2019.json';
import overseasDestination2023 from './overseasDestination2023.json';
import overseasDestination2024 from './overseasDestination2024.json';

const monthMap = {
  '1월': 'jan',
  '2월': 'feb',
  '3월': 'mar',
  '4월': 'apr',
  '5월': 'may',
  '6월': 'jun',
  '7월': 'jul',
  '8월': 'aug',
  '9월': 'sep',
  '10월': 'oct',
  '11월': 'nov',
  '12월': 'dec',
};

// 2019년 1월 ~ 2019년 12월 데이터
export function localTraveler2019() {
  const data = overseasDestination2019;

  const result = [];

  data.forEach((item) => {
    const country = item['행선국(도착지별)'];
    const formattedData = {
      country,
      date: Object.keys(item).reduce((acc, key) => {
        if (key !== '행선국(도착지별)') {
          const monthKey = key.split('-')[1];
          const monthAbbr = monthKey.toLowerCase();
          if (monthAbbr) {
            acc.push({ [monthAbbr]: item[key] });
          }
        }
        return acc;
      }, []),
    };

    result.push(formattedData);
  });

  return result;
}

// 2023년 1월 ~ 2023년 12월 데이터
export function localTraveler2023() {
  const data = overseasDestination2023;

  const result = [];

  data.forEach((item) => {
    const country = item['행선국(도착지별)'];
    const formattedData = {
      country,
      date: Object.keys(item).reduce((acc, key) => {
        if (key !== '행선국(도착지별)') {
          const monthKey = key.split(' ')[1];
          const monthAbbr = monthMap[monthKey];
          if (monthAbbr) {
            acc.push({ [monthAbbr]: item[key] });
          }
        }
        return acc;
      }, []),
    };

    result.push(formattedData);
  });

  return result;
}

// 2024년 1월 ~ 2024년 7월 데이터
export function localTraveler2024() {
  const data = overseasDestination2024;

  const result = [];

  data.forEach((item) => {
    const { 도착지, 내국인출국자, 월 } = item;

    const month = monthMap[`${월}월`];

    let existingCountry = result.find((entry) => entry.country === 도착지);

    if (existingCountry) {
      existingCountry.date.push({ [month]: 내국인출국자 });
    } else {
      result.push({
        country: 도착지,
        date: [{ [month]: 내국인출국자 }],
      });
    }
  });

  return result;
}
