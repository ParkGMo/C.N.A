import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { convertCodeISO2, convertCodeISO3 } from '../../lib/convertIsoCode';
import { fetchCountryInfoData } from '../../store/countryInfo/coutryInfoSlice';
import CountryBasicInfo from './country-basic-info/CountryBasicInfo';
import CountryContactInfo from './country-contact-info/CountryContactInfo';
import CountryDetailInfo from './country-detail-info/CountryDetailInfo';
import styles from './CountryInfo.module.scss';

function CountryInfo() {
  const location = useLocation();
  const keyword = location.state?.keyword || null;

  const { basicData, securityEnvData, localContactData } = useSelector(
    (state) => state.countryInfoSlice
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const isoCode2 = convertCodeISO2(keyword);
    const isoCode3 = convertCodeISO3(keyword);

    dispatch(fetchCountryInfoData([isoCode3, isoCode2, isoCode2]));
  }, [keyword, dispatch]);

  return (
    <div className={styles.container}>
      {basicData && keyword !== '' ? (
        <div className={styles.content}>
          {/* 국가 기본 정보 */}
          <CountryBasicInfo
            basicData={basicData}
            travelAlarm={securityEnvData?.current_travel_alarm}
            dangMap={localContactData.dang_map_download_url}
          />
          {/* 국가 상세 정보 */}
          <CountryDetailInfo detail={basicData.basic} />
          {/* 대사관 연락처 및 신고 */}
          <CountryContactInfo contact={localContactData.contact_remark} />
        </div>
      ) : basicData === undefined && keyword !== '' ? (
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
