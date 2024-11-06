import React from 'react';
import {
  localTraveler2019,
  localTraveler2023,
  localTraveler2024,
} from '../../lib/overseasDestinationData';
import NationalTourlistStatistics from './national-tourlist-statistics/NationalTourlistStatistics';
import TouristsByDestination from './tourists-by-destination/TouristsByDestination';

function OverseasTouristInfo() {
  const data2019 = localTraveler2019();
  const data2023 = localTraveler2023();
  const data2024 = localTraveler2024();

  return (
    <div>
      <div>해외관광객 정보</div>
      <NationalTourlistStatistics />
      <TouristsByDestination />
    </div>
  );
}

export default OverseasTouristInfo;
