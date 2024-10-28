import React from "react";
import Search from "../../components/search/Search";
import styles from "./Intro.module.scss";
import TravelAvisorAPI from "../../components/travelAdvisor/TravelAvisorAPI";
import AirportInfo from "../../components/airportInfo/AirportInfo";
import IATAICAO from "../../components/IATAICAO/IATAICAO";

function Intro(props) {
  return (
    <div className={styles.intro}>
      Intro
      <div>첫 화면</div>
      <Search />
      <TravelAvisorAPI />
      <AirportInfo />
      <IATAICAO />
    </div>
  );
}

export default Intro;
