import React from 'react';
import styles from './CountryDetailInfo.module.scss';

function CountryDetailInfo({ detail }) {
  return (
    <div className={styles.countryInfo}>
      <h3>정보</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: detail,
        }}
      />
    </div>
  );
}

export default CountryDetailInfo;
