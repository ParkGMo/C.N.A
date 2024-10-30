import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AirportInfo from "../../components/airportInfo/AirportInfo";
import IATAICAO from "../../components/IATAICAO/IATAICAO";
import Search from "../../components/search/Search";
// import TravelAvisorAPI from "../../components/travelAdvisor/TravelAvisorAPI";s
import { useDispatch, useSelector } from "react-redux";
import Airportlounge from "../../components/airportInfo/Airportlounge";
import Card from "../../components/layout/card/Card";
import { convertCodeISO2, convertCodeISO3 } from "../../lib/convertIsoCode";
import { fetchCountryInfoData } from "../../store/countryInfo/coutryInfoSlice";
import { randomCountryName } from "../../utils/randomCountryName";
import CountryBasicInfo from "../countryInfo/country-basic-info/CountryBasicInfo";
import styles from "./Intro.module.scss";

function Intro() {
  const [value, setValue] = useState(randomCountryName());

  const { basicData, securityEnvData, localContactData } = useSelector(
    (state) => state.countryInfoSlice
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const isoCode2 = convertCodeISO2(value);
    const isoCode3 = convertCodeISO3(value);

    dispatch(fetchCountryInfoData([isoCode3, isoCode2, isoCode2]));
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
          to={"/country-info"}
          state={{ keyword: value }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card>
            <CountryBasicInfo
              className={styles.basicInfo}
              basicData={basicData}
              travelAlarm={securityEnvData?.current_travel_alarm}
              dangMap={localContactData.dang_map_download_url}
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
      <Airportlounge />
      <Card>
        <Link to="country-info">나라별 기본정보 검색하기</Link>
      </Card>
      {/* <ChartBar /> */}
    </div>
  );
}

export default Intro;
