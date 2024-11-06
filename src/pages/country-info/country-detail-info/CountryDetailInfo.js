import React from 'react';
import styles from './CountryDetailInfo.module.scss';

function CountryDetailInfo({ detail }) {
  console.log('generalData: ', detail);

  return (
    <div className={styles.countryInfo}>
      <h3>정보</h3>
      <ul>
        <li>
          <span>면적: </span>
          <p>
            {Number(detail?.area).toLocaleString()}
            <span>{detail?.area_desc}</span>
          </p>
        </li>
        <li>
          <span>수도: </span>
          <p>{detail?.capital}</p>
        </li>
      </ul>
    </div>
  );
}

export default CountryDetailInfo;
