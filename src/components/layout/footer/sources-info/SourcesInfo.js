import React from 'react';
import { Link } from 'react-router-dom';
import sourcesImg from '../../../../assets/img_opentype01.jpg';

function SourcesInfo() {
  return (
    <div>
      <img src={sourcesImg} alt="" />
      <div>
        출처 - 한국문화관광연구원
        <Link
          to="https://www.data.go.kr/data/15000297/openapi.do"
          target="_blank"
        >
          한국문화관광연구원_출입국관광통계서비스 API
        </Link>
      </div>
    </div>
  );
}

export default SourcesInfo;
