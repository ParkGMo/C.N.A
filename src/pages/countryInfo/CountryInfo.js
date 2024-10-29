import React, { useCallback, useEffect, useState } from 'react';
import {
  basicInfoData,
  localContactInfoData,
  securityEnvInfoData,
} from '../../api/basicInfo';
import Search from '../../components/search/Search';
import { convertCodeISO2, convertCodeISO3 } from '../../lib/convertIsoCode';
import { randomCountryName } from '../../utils/randomCountryName';
import styles from './CountryInfo.module.scss';

function CountryInfo() {
  const [basicData, setBasicData] = useState([]);
  const [securityEnvData, setSecurityEnvData] = useState([]);
  const [localContactData, setLocalContactData] = useState([]);
  const [value, setValue] = useState(randomCountryName());

  const handleLoad = useCallback(async () => {
    const isoCode2 = convertCodeISO2(value);
    const isoCode3 = convertCodeISO3(value);

    const fetchBasicData = await basicInfoData(isoCode3);
    const fetchSecurityEnvInfoData = await securityEnvInfoData(isoCode2);
    const fetchLocalContactInfoData = await localContactInfoData(isoCode2);

    setBasicData(fetchBasicData);
    setSecurityEnvData(fetchSecurityEnvInfoData);
    setLocalContactData(fetchLocalContactInfoData);
  }, [value]);

  useEffect(() => {
    handleLoad();
  }, [value, handleLoad]);

  console.log(localContactData);

  return (
    <div className={styles.container}>
      CountryInfo
      <Search value={value} setValue={setValue} />
      {basicData && value !== '' ? (
        <div>
          <div>국가명 : {basicData.countryName}</div>
          <div>영문명 : {basicData.countryEnName}</div>
          <div>대륙명 : {basicData.continent}</div>
          <div>
            <img src={basicData.imgUrl} alt="" />
          </div>
          <div className={styles.countryInfo}>
            <h3>정보</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: basicData.basic,
              }}
            />
          </div>
          <div>{securityEnvData.current_travel_alarm}</div>
          <div className={styles.contact}>
            <div
              dangerouslySetInnerHTML={{
                __html: localContactData.contact_remark,
              }}
            />
          </div>
          <div>
            <img src={localContactData.dang_map_download_url} alt="" />
          </div>
        </div>
      ) : basicData === undefined && value !== '' ? (
        <div>
          <p>해당 국가에 대한 정보가 없습니다.</p>
          <span>검색어를 다시 한 번 확인해주세요!</span>
        </div>
      ) : (
        <div>검색어를 입력해주세요.</div>
      )}
    </div>
  );
}

export default CountryInfo;
