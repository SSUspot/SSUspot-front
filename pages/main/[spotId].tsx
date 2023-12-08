import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Header from '../../component/layout/header';
import Filter from '../../component/layout/filter';
import Navigation from '../../component/layout/navigation';

import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';

const SpotPage = () => {
  const router = useRouter();
  const { spotId } = router.query;

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
        {/* <SpotFrame>
          <SpotName> {spots[Number(spotId)-1].spotName} </SpotName>
          <SpotInfo>{spots[Number(spotId)-1].spotInfo}</SpotInfo>
          <SpotImage src={spots[Number(spotId)-1].spotImage} alt={spots[Number(spotId)-1].spotName} />
        </SpotFrame> */}
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
`;

const SpotName = styled.div`
  font-family: 'Giants';
  font-size: 6vh;
  margin-bottom: 2vh;
`;

const SpotImage = styled(Image)`
  width: 60%;
  height: 50%;
  object-fit: cover;
  object-position: center center;
  top: 0;
  left: 0;
`;

const SpotInfo = styled.div`
  width: 60%;
  display: flex;
  font-family: 'GiantsLight';
  font-size: 2vh;
  line-height: 200%;
`;
