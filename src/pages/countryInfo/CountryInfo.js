import React, { useCallback, useEffect, useState } from 'react';
import { basicInfoData } from '../../api/basicInfo';
import Search from '../../components/search/Search';
import { randomCountryName } from '../../utils/randomCountryName';
import styles from './CountryInfo.module.scss';

function CountryInfo() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(randomCountryName());

  const handleLoad = useCallback(async () => {
    const basicData = await basicInfoData(value);
    setData(basicData);
  }, [value]);

  useEffect(() => {
    handleLoad();
  }, [value, handleLoad]);

  console.log(data);
  console.log(value);

  return (
    <div className={styles.container}>
      CountryInfo
      <Search value={value} setValue={setValue} />
      {data ? (
        <div>
          <div>국가명 : {data.countryName}</div>
          <div>영문명 : {data.countryEnName}</div>
          <div>대륙명 : {data.continent}</div>
          <div>
            <img src={data.imgUrl} alt="" />
          </div>
        </div>
      ) : (
        <div>검색어를 입력해주세요.</div>
      )}
    </div>
  );
}

export default CountryInfo;
