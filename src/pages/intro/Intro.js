import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AirportInfo from '../../components/airportInfo/AirportInfo';
import IATAICAO from '../../components/IATAICAO/IATAICAO';
import Search from '../../components/search/Search';
// import TravelAvisorAPI from "../../components/travelAdvisor/TravelAvisorAPI";s
import { useDispatch, useSelector } from 'react-redux';
import Overseas from '../../components/airportInfo/Overseas';
import Card from '../../components/layout/card/Card';
import { convertCodeISO2, convertCodeISO3 } from '../../lib/convertIsoCode';
import { fetchCountryInfoData } from '../../store/country-info-slice/countryInfoSlice';
import { randomCountryName } from '../../utils/randomCountryName';
import CountryBasicInfo from '../country-info/country-basic-info/CountryBasicInfo';
import TouristsByDestination from '../overseas-tourist-info/tourists-by-destination/TouristsByDestination';
import styles from './Intro.module.scss';

function Intro() {
  const [value, setValue] = useState(randomCountryName());

  const { basicData, securityEnvData, localContactData, countryFlagData } =
    useSelector((state) => state.countryInfoSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    const isoCode2 = convertCodeISO2(value);
    const isoCode3 = convertCodeISO3(value);

    dispatch(
      fetchCountryInfoData([isoCode3, isoCode2, isoCode2, isoCode2, isoCode2])
    );
  }, [value, dispatch]);

  return (
    <div className={styles.intro}>
      <Search
        value={value}
        setValue={setValue}
        placeholder="국가를 검색해주세요."
      />
      <div className={styles.container}>
        <Link
          className={styles.content}
          to={'/country-info'}
          state={{ keyword: value }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card>
            <CountryBasicInfo
              className={styles.basicInfo}
              flagUrl={countryFlagData?.download_url}
              basicData={basicData}
              travelAlarm={securityEnvData?.current_travel_alarm}
              dangMap={localContactData?.dang_map_download_url}
            />
          </Card>
        </Link>
        <div className={styles.content}>
          <Card>날씨, 시차 정보</Card>
        </div>
      </div>
      {/* <TravelAvisorAPI /> */}
      <AirportInfo />
      <IATAICAO />
      {/* <Airportlounge /> */}
      <Overseas />
      <Card>
        <TouristsByDestination country={value} />
      </Card>
      <Card>
        <Link to="/overseas-tourist">행선지별 관광객</Link>
      </Card>
      {/* <ChartBar /> */}
    </div>
  );
}

export default Intro;
