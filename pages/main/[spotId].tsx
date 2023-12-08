import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../component/layout/header';
import Filter from '../../component/layout/filter';
import Navigation from '../../component/layout/navigation';
import axiosInstance from '../../utils/axiosInstance';

import Spot from '../../type/spot';

const SpotPage = () => {
  const router = useRouter();
  const { spotId } = router.query;
  const [spots, setSopts] = useState<Spot[]>([]);
  const selectedSpot = spots.find((spot) => spot.id === Number(spotId));

  useEffect(() => {
    axiosInstance
      .get('/api/spots')
      .then((response) => {
        console.log('/api/spots', response.data);
        setSopts(response.data);
      })
      .catch((error) => {
        console.log('/api/spots error', error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>SSUspot</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Header />
      <Filter />
      <Navigation />

      <Container>
        {selectedSpot && (
          <SpotFrame>
            <SpotName> [ {selectedSpot.spotName} ]</SpotName>
            <SpotInfo>{selectedSpot.spotInfo}</SpotInfo>
            <SpotImage
              src={selectedSpot.spotThumbnailImageLink}
              alt={selectedSpot.spotName}
              width={1600}
              height={1200}
            />
          </SpotFrame>
        )}
      </Container>
    </>
  );
};

export default SpotPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const SpotFrame = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
  gap: 2vh;

  @media (max-width: 735px) {
    margin-top: 3vh;
    gap: 1vh;
  }
`;

const SpotName = styled.div`
  font-family: 'GmarketSansBold';
  font-size: 6vh;
  margin-bottom: 2vh;

  @media (max-width: 735px) {
    font-size: 3vh;
    margin-bottom: 1vh;
  }
`;

const SpotImage = styled(Image)`
  width: 60%;
  height: 50%;
  object-fit: cover;
  object-position: center center;
  top: 0;
  left: 0;

  @media (max-width: 735px) {
    width: 80%;
  }
`;

const SpotInfo = styled.div`
  width: 60%;
  display: flex;
  font-family: 'GmarketSansMedium';
  font-size: 2vh;
  line-height: 200%;

  @media (max-width: 735px) {
    width: 80%;
    font-size: 1vh;
  }
`;
