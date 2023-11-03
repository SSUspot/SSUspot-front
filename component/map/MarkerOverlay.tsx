import React, { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import Image from 'next/image';

interface Spot {
  id: number;
  latitude: number;
  longitude: number;
  spotLevel: number;
  spotName: string;
  spotThumbnailImageLink: string;
}

const MarkerOverlay: React.FC<{
  spot: Spot;
}> = ({ spot }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <InfoWindow>
      <SpotImage src={spot.spotThumbnailImageLink} alt={spot.spotName} width={100} height={100} />
    </InfoWindow>
  );
};

export default MarkerOverlay;

const InfoWindow = styled.div`
  width: 13vh;
  height: 13vh;
  background-color: #e14942;
  border: none;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const SpotImage = styled(Image)`
  width: 90%;
  height: 90%;
  object-fit: cover;
  object-position: center center;
  border-radius: 15px;
  top: 0;
  left: 0;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
`;
