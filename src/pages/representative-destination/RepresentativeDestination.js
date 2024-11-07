import React, { useEffect, useState } from 'react';
import { getPlaces } from '../../api/googlePlacesAPI';

function RepresentativeDestination() {
  const [famousPlace, setFamousPlace] = useState([]);

  const handleLoad = async () => {
    const data = await getPlaces('미국', '관광+명소');

    setFamousPlace(data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  console.log(famousPlace);

  return (
    <div>
      <h3>대표 관광지</h3>
      <div>
        {famousPlace.map((data) => (
          <div key={data.place_id}>
            <img src={data.icon} alt="" />
            <p>{data.name}</p>
            <p>주소: {data.formatted_address}</p>
            <p>
              평점 : {data.rating}점
              <span>({data.user_ratings_total}명이 참여함)</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RepresentativeDestination;
