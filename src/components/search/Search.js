import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
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
      <input
        type="text"
        value={searchValue}
        onChange={handleChangeValue}
        placeholder="검색어를 입력해주세요."
      />
      <span className={styles.icon}>
        <RiSearchLine />
      </span>
    </form>
  );
}

export default Search;
