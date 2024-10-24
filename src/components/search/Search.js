import React from 'react';
import InputBox from '../inputBox/InputBox';
import styles from './Search.module.scss';

function Search() {
  return (
    <div className={styles.searchBox}>
      <InputBox />
      <button>찾기</button>
    </div>
  );
}

export default Search;
