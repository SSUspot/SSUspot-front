import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Header from '../../component/layout/header';
import Filter from '../../component/layout/filter';
import Navigation from '../../component/layout/navigation';

import { useRouter } from 'next/router';
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
const SpotPage: React.FC<{
  spot: Spot;
}> = ({ spot }) => {
  const router = useRouter();
  const { spotName, spotThumbnailImageLink } = router.query;

  return (
    <>
      <Head>
        <title>SSUspot</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />
      <Filter />
      <Navigation />

      <Container>
        <SpotFrame>
          <SpotName> {spotName} </SpotName>
          <SpotInfoFrame>
            <SpotImage src={spotThumbnailImageLink} alt={spotName} width={100} height={100} />
            <SpotInfo>
              장소에 대한 설명
              <br />
              내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
            </SpotInfo>
          </SpotInfoFrame>
        </SpotFrame>
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
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 5vh;
  gap: 2vh;
`;

const SpotName = styled.div`
  font-family: 'Giants';
  font-size: 5vh;
`;

const SpotInfoFrame = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SpotImage = styled(Image)`
  width: 50%;
  height: 50%;
  object-fit: cover;
  object-position: center center;
  top: 0;
  left: 0;
`;

const SpotInfo = styled.div`
  width: 45%;
  height: 50%;
  display: flex;
  font-family: 'GiantsLight';
  font-size: 2vh;
`;
