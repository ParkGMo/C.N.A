import React from 'react';
import Search from '../../components/search/Search';
import styles from './Intro.module.scss';

function Intro() {
  return (
    <div className={styles.intro}>
      Intro
      <div>첫 화면</div>
      <Search />
    </div>
  );
}

export default Intro;
