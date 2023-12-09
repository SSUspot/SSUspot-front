import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../component/layout/header';
import Filter from '../../component/layout/filter';
import Navigation from '../../component/layout/navigation';
import PostThread from '../../component/thread/postThread';
import axiosInstance from '../../utils/axiosInstance';

import Spot from '../../type/spot';
import Post from '../../type/post';

const SpotPage = () => {
  const router = useRouter();
  const { spotId } = router.query;
  const [spots, setSopts] = useState<Spot[]>([]);
  const [spotPosts, setSpotPosts] = useState<Post[]>([]);
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

    if (spotId) {
      axiosInstance
        .get(`/api/posts/spots/${spotId}`, {
          params: {
            page: 1,
            size: 10,
          },
        })
        .then((response) => {
          console.log('/api/posts/spots/${spotId}', response.data);
          setSpotPosts(response.data);
        })
        .catch((error) => {
          console.log('/api/posts/spots/${spotId}', error);
        });
    }
  }, [spotId]);

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
        <DivisionBar />
        <PostsInfo> 게시글 </PostsInfo>
        <PostThread posts={spotPosts} />
      </Container>
    </>
  );
};

export default SpotPage;

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const SpotFrame = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
  gap: 2vh;
  box-sizing: border-box;

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
  width: 50%;
  height: 50%;
  object-fit: cover;
  object-position: center center;
  top: 0;
  left: 0;

  @media (max-width: 735px) {
    width: 70%;
  }
`;

const SpotInfo = styled.div`
  width: 50%;
  display: flex;
  font-family: 'GmarketSansMedium';
  font-size: 2vh;
  line-height: 200%;

  @media (max-width: 735px) {
    width: 70%;
    font-size: 1vh;
  }
`;

const DivisionBar = styled.div`
  width: 80%;
  border: 4px solid rgba(194, 186, 186, 0.4);
  margin-top: 5vh;
  margin-bottom: 5vh;

  @media (max-width: 735px) {
    margin-top: 3vh;
    margin-bottom: 0;
  }
`;

const PostsInfo = styled.div`
  width: 55%;
  display: flex;
  font-family: 'GmarketSansMedium';
  font-size: 3vh;
  margin-bottom: 4vh;

  @media (max-width: 735px) {
    width: 70%;
    font-size: 1vh;
  }
`;
