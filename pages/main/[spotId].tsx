import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../component/layout/header';
import Navigation from '../../component/layout/navigation';
import PostCard from '../../component/thread/postCard';
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
      <Navigation />

      <Container>
        {selectedSpot && (
          <SpotFrame>
            <SpotImage src={selectedSpot.spotThumbnailImageLink} alt={selectedSpot.spotName} />
            <SpotInfoFrame>
              <SpotName> {selectedSpot.spotName}</SpotName>
              <SpotInfo>{selectedSpot.spotInfo}</SpotInfo>
            </SpotInfoFrame>
          </SpotFrame>
        )}
        <DivisionBar />
        <PostsInfo> 특별한 순간들을 공유한 게시물들을 확인해보세요. </PostsInfo>
        <PostsSubInfo>놀라운 이야기들이 여러분을 기다리고 있어요! 📸✨ </PostsSubInfo>
        <PostCard posts={spotPosts} />
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
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
  box-sizing: border-box;

  @media (max-width: 735px) {
    margin-top: 3vh;
    flex-direction: column;
  }
`;

const SpotInfoFrame = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 735px) {
    width: 80%;
    margin-top: 2vh;
  }
`;

const SpotName = styled.div`
  width: 90%;
  font-family: 'GmarketSansBold';
  font-size: 6vh;
  margin-bottom: 2vh;

  @media (max-width: 735px) {
    width: 100%;
    font-size: 3vh;
    margin-bottom: 1vh;
    display: flex;
    justify-content: center;
  }
`;

const SpotImage = styled.img`
  width: 50%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;

  @media (max-width: 735px) {
    width: 80%;
  }
`;

const SpotInfo = styled.div`
  width: 90%;
  display: flex;
  font-family: 'GmarketSansMedium';
  font-size: 2vh;
  line-height: 200%;

  @media (max-width: 735px) {
    width: 100%;
    font-size: 1.4vh;
    line-height: 150%;
  }
`;

const DivisionBar = styled.div`
  width: 80%;
  border: 4px solid rgba(194, 186, 186, 0.4);
  margin: 8vh;

  @media (max-width: 735px) {
    width: 90%;
    margin: 5vh;
  }
`;

const PostsInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'GmarketSansBold';
  font-size: 4vh;
  margin-bottom: 2vh;

  @media (max-width: 735px) {
    font-size: 1.9vh;
  }
`;

const PostsSubInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'GmarketSansMedium';
  font-size: 2vh;
  margin-bottom: 4vh;

  @media (max-width: 735px) {
    width: 70%;
    font-size: 1.2vh;
  }
`;
