import React from 'react';
import styles from './Search.module.scss';

function Search() {
  return (
    <form className={styles.searchBox}>
      <input type="text" />
      <button type="submit">찾기</button>
    </form>
  );
}

export default Search;
