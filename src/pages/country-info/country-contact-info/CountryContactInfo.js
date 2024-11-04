import React from 'react';
import styles from './CountryContactInfo.module.scss';

function CountryContactInfo({ contact }) {
  return (
    <div className={styles.contact}>
      <div
        dangerouslySetInnerHTML={{
          __html: contact,
        }}
      />
    </div>
  );
}

export default CountryContactInfo;
