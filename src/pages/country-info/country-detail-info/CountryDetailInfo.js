import React from 'react';
import styles from './CountryDetailInfo.module.scss';

function CountryDetailInfo({ detail }) {
  return (
    <div className={styles.countryInfo}>
      <h3>정보</h3>
      <table className={styles.detailData}>
        <tbody>
          {detail?.capital && (
            <tr>
              <th>수도</th>
              <td>
                <p>{detail?.capital}</p>
              </td>
            </tr>
          )}
          {detail?.area && (
            <tr>
              <th>면적</th>
              <td>
                <p>{Number(detail?.area).toLocaleString()}km²</p>
                <span>{detail?.area_desc}</span>
              </td>
            </tr>
          )}
          {detail?.establish && (
            <tr>
              <th>설립일</th>
              <td>
                <p>{detail?.establish}</p>
              </td>
            </tr>
          )}
          {detail?.population && (
            <tr>
              <th>인구</th>
              <td>
                <p>약 {Number(detail?.population).toLocaleString()}명</p>
                <span>{detail?.population_desc}</span>
              </td>
            </tr>
          )}
          {detail?.ethnic && (
            <tr>
              <th>민족</th>
              <td>
                <p>{detail?.ethnic}</p>
              </td>
            </tr>
          )}
          {detail?.lang && (
            <tr>
              <th>언어</th>
              <td>
                <p>{detail?.lang}</p>
              </td>
            </tr>
          )}
          {detail?.climate && (
            <tr>
              <th>기후</th>
              <td>
                <p>{detail?.climate}</p>
              </td>
            </tr>
          )}
          {detail?.religion && (
            <tr>
              <th>종교</th>
              <td>
                <p>{detail?.religion}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CountryDetailInfo;
