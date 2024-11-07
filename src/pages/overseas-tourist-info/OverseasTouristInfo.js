import React from 'react';
import NationalTourlistStatistics from './national-tourlist-statistics/NationalTourlistStatistics';
import TouristsByDestination from './tourists-by-destination/TouristsByDestination';

function OverseasTouristInfo() {
  return (
    <div>
      <div>해외관광객 정보</div>
      <NationalTourlistStatistics />
      <TouristsByDestination />
    </div>
  );
}

export default OverseasTouristInfo;
