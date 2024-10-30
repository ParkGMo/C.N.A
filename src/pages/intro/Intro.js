import React from "react";
import { Link } from "react-router-dom";
import AirportInfo from "../../components/airportInfo/AirportInfo";
import IATAICAO from "../../components/IATAICAO/IATAICAO";
import Search from "../../components/search/Search";
// import TravelAvisorAPI from "../../components/travelAdvisor/TravelAvisorAPI";s
import Airportlounge from "../../components/airportInfo/Airportlounge";
import Card from "../../components/layout/card/Card";
import styles from "./Intro.module.scss";
import ChartBar from "../../components/chart/ChartBar";

function Intro() {
  return (
    <div className={styles.intro}>
      Intro
      <div>첫 화면</div>
      <Search />
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
