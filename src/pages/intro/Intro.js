import React from 'react';
import { Link } from 'react-router-dom';
import AirportInfo from '../../components/airportInfo/AirportInfo';
import IATAICAO from '../../components/IATAICAO/IATAICAO';
import Search from '../../components/search/Search';
import TravelAvisorAPI from '../../components/travelAdvisor/TravelAvisorAPI';
import styles from './Intro.module.scss';

function Intro() {
  return (
    <div className={styles.intro}>
      Intro
      <div>첫 화면</div>
      <Search />
      <TravelAvisorAPI />
      <AirportInfo />
      <IATAICAO />
      <Link to="country-info">나라별 기본정보 검색하기</Link>
    </div>
  );
}

export default Intro;
