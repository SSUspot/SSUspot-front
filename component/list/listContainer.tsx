import React, { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Spot {
  id: number;
  latitude: number;
  longitude: number;
  spotLevel: number;
  spotName: string;
  spotThumbnailImageLink: string;
}

const ListContainer: React.FC<{
  spots: Spot[];
}> = ({ spots }) => {
  const router = useRouter();

  const handleSpotPage = (spot: Spot) => {
    router.push({
      pathname: `/main/${spot.id}`,
      query: {
        id: spot.id,
        latitude: spot.latitude,
        longitude: spot.longitude,
        spotLevel: spot.spotLevel,
        spotName: spot.spotName,
        spotThumbnailImageLink: spot.spotThumbnailImageLink,
      },
    });
  };

  return (
    <>
      <Container>
        {spots.map((spot, index) => (
          <SpotFrame key={index} onClick={() => handleSpotPage(spot)}>
            <SpotImage
              src={spot.spotThumbnailImageLink}
              alt={spot.spotName}
              width={100}
              height={100}
            />
            <SpotInfoFrame>
              <SpotName>{spot.spotName}, </SpotName>
              <SpotTag> #해시태그 #해시태그 #해시태그 </SpotTag>
            </SpotInfoFrame>
          </SpotFrame>
        ))}
      </Container>
    </>
  );
};

export default ListContainer;

const Container = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2vw;
  overflow-x: hidden;
  overflow-y: auto;
`;

const SpotFrame = styled.div`
  width: 18vw;
  height: auto;
  padding-top: 2vw;
  padding-bottom: 2vw;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SpotImage = styled(Image)`
  width: 100%;
  height: 15vw;
  object-fit: cover;
  object-position: center center;
  border-radius: 15px;
  top: 0;
  left: 0;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
`;

const SpotInfoFrame = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px;
`;

const SpotName = styled.div`
  font-family: 'BMHANNAPro';
  font-size: 1vw;
`;

const SpotTag = styled.div`
  font-family: 'BMHANNAAir';
  font-size: 0.8vw;
`;
