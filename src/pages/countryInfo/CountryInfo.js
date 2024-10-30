import React, { useCallback, useEffect, useState } from 'react';
import {
  basicInfoData,
  localContactInfoData,
  securityEnvInfoData,
} from '../../api/basicInfo';
import CustomModal from '../../components/layout/custom-modal/CustomModal';
import Search from '../../components/search/Search';
import { convertCodeISO2, convertCodeISO3 } from '../../lib/convertIsoCode';
import { randomCountryName } from '../../utils/randomCountryName';
import styles from './CountryInfo.module.scss';

function CountryInfo() {
  const [basicData, setBasicData] = useState([]);
  const [securityEnvData, setSecurityEnvData] = useState([]);
  const [localContactData, setLocalContactData] = useState([]);
  const [value, setValue] = useState(randomCountryName());
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleLoad = useCallback(async () => {
    const isoCode2 = convertCodeISO2(value);
    const isoCode3 = convertCodeISO3(value);

    const fetchBasicData = await basicInfoData(isoCode3);
    const fetchSecurityEnvInfoData = await securityEnvInfoData(isoCode2);
    const fetchLocalContactInfoData = await localContactInfoData(isoCode2);

    if (fetchBasicData) {
      setBasicData(fetchBasicData);
    }
    setSecurityEnvData(fetchSecurityEnvInfoData);
    setLocalContactData(fetchLocalContactInfoData);
  }, [value]);

  useEffect(() => {
    handleLoad();
  }, [value, handleLoad]);

  const travelAlarmColor = (alarm) => {
    if (alarm.includes('1단계')) {
      return styles.attention;
    } else if (alarm.includes('2단계')) {
      return styles.refrainment;
    } else if (alarm.includes('3단계')) {
      return styles.recommendation;
    } else if (alarm.includes('4단계')) {
      return styles.forbid;
    } else if (alarm === 'normal') {
      return styles.normal;
    } else {
      return styles.specialAadvisory;
    }
  };

  return (
    <div className={styles.container}>
      <Search value={value} setValue={setValue} />
      {basicData && value !== '' ? (
        <div className={styles.content}>
          {/* 국가 기본 정보 */}
          <div className={styles.basicInfo}>
            <div className={styles.flag}>
              <img src={basicData.imgUrl} alt="" />
            </div>
            <div className={styles.locationInfo}>
              <span>[{basicData.continent}]</span>
              <h2>{basicData.countryName}</h2>
              <h3>{basicData.countryEnName}</h3>
              {/* 여행 경보 */}
              <div className={styles.travelAlarm}>
                <button
                  className={travelAlarmColor(
                    securityEnvData?.current_travel_alarm || 'normal'
                  )}
                  onClick={handleOpen}
                >
                  {securityEnvData?.current_travel_alarm || '여행경보단계 조회'}
                </button>
                <CustomModal isOpen={isOpen} handleClose={handleClose}>
                  <div className={styles.dangMap}>
                    <img src={localContactData.dang_map_download_url} alt="" />
                  </div>
                </CustomModal>
              </div>
            </div>
          </div>
          {/* 국가 상세 정보 */}
          <div className={styles.countryInfo}>
            <h3>정보</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: basicData.basic,
              }}
            />
          </div>
          {/* 대사관 연락처 및 신고 */}
          <div className={styles.contact}>
            <div
              dangerouslySetInnerHTML={{
                __html: localContactData.contact_remark,
              }}
            />
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
