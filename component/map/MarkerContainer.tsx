import React, { useState } from 'react';
import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import Image from 'next/image';
import marker from '../../public/Marker.png';
import MarkerOverlay from './MarkerOverlay';
import { useRouter } from 'next/router';

import Spot from '../../type/spot';

const EventMarkerContainer: React.FC<{
  spot: Spot;
  index: number;
}> = ({ spot, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const handleSpotPage = (spot: Spot) => {
    router.push(`/main/${spot.id}`);
  };

  return (
    <>
      <MapMarker
        key={index}
        position={{ lat: spot.latitude, lng: spot.longitude }}
        image={{
          src: 'https://i.ibb.co/FXsX2d8/Marker.png',
          size: {
            width: 48,
            height: 64,
          },
          options: {
            offset: {
              x: 25,
              y: 64,
            },
          },
        }}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
        onClick={() => handleSpotPage(spot)}
      />
      {isVisible && (
        <CustomOverlayMap position={{ lat: spot.latitude, lng: spot.longitude }} yAnchor={1.6}>
          <MarkerOverlay spot={spot} />
        </CustomOverlayMap>
      )}
    </>
  );
};

export default EventMarkerContainer;
