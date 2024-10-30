import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import styles from './Search.module.scss';

function Search({ value, setValue, placeholder = 'Search Keyword...' }) {
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
        placeholder={placeholder}
      />
      <span className={styles.icon}>
        <RiSearchLine />
      </span>
    </form>
  );
}

export default Search;
