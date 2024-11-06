import React, { useEffect } from 'react';
import {
  localTraveler2019,
  localTraveler2023,
  localTraveler2024,
} from '../../lib/overseasDestinationData';

function OverseasTouristInfo() {
  const data2019 = localTraveler2019();
  const data2023 = localTraveler2023();
  const data2024 = localTraveler2024();

  useEffect(() => {
    console.log(data2024);
  }, []);

  return <div>OverseasTouristInfo</div>;
}

export default OverseasTouristInfo;
