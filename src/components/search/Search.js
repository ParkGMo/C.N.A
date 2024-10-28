import React, { useState } from 'react';
import styles from './Search.module.scss';

function Search({ value, setValue }) {
  const [searchValue, setSearchValue] = useState(value);

  const handleChangeValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(searchValue);
  };

  return (
    <form className={styles.searchBox} onSubmit={handleSubmit}>
      <input type="text" value={searchValue} onChange={handleChangeValue} />
      <button type="submit">찾기</button>
    </form>
  );
}

export default Search;
