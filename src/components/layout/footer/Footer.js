import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className={styles.footer}>
      <small>Copyright {new Date().getFullYear()}. All rights reserved.</small>
      <p>
        본 저작물은{' '}
        <Link to="https://www.data.go.kr/index.do" target="_blank">
          공공데이터포털
        </Link>
        의 Open API를 활용해 제작되었습니다.
      </p>
      <Link to="/sources">출처확인</Link>
    </div>
  );
}

export default Footer;
