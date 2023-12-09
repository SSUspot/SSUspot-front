import React, { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Spot from '../../type/spot';

const ListContainer: React.FC<{
  spots: Spot[];
}> = ({ spots }) => {
  const router = useRouter();

  const handleSpotPage = (spot: Spot) => {
    router.push(`/main/${spot.id}`);
  };

  return (
    <>
      <Container>
        {spots.map((spot, index) => (
          <SpotFrame key={index} onClick={() => handleSpotPage(spot)}>
            <SpotImage
              src={spot.spotThumbnailImageLink}
              alt={spot.spotName}
              width={300}
              height={300}
            />
            <SpotInfoFrame>
              <SpotName>{spot.spotName} </SpotName>
              <SpotAddress>{spot.spotAddress} </SpotAddress>
            </SpotInfoFrame>
          </SpotFrame>
        ))}
      </Container>
    </>
  );
};

export default ListContainer;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 1vh 4vh;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;

  @media (max-width: 735px) {
    padding: 1vh;
  }
`;

const SpotFrame = styled.div`
  width: 25%;
  aspect-ratio: 1;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 0.5vh;
  padding-right: 0.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    color: rgba(33, 70, 199, 0.7);
    transition: 0.3s;
  }

  @media (max-width: 735px) {
    width: 50%;
    height: 50%;
    padding-top: 1vh;
    padding-bottom: 1vh;
  }
`;

const SpotImage = styled(Image)`
  width: 90%;
  height: 90%;
  object-fit: cover;
  object-position: center center;
  border-radius: 5%;
  top: 0;
  left: 0;
`;

const SpotInfoFrame = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1.5vh 1vh;
  box-sizing: border-box;

  @media (max-width: 735px) {
    padding: 1vh 0.5vh;
  }
`;

const SpotName = styled.div`
  font-family: 'GmarketSansBold';
  font-size: 2vh;

  @media (max-width: 735px) {
    font-size: 1.5vh;
  }
`;

const SpotAddress = styled.div`
  font-family: 'GmarketSansMedium';
  font-size: 1.5vh;

  @media (max-width: 735px) {
    font-size: 0.8vh;
  }
`;
