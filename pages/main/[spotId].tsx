import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../component/layout/header';
import Navigation from '../../component/layout/navigation';
import PostCard from '../../component/thread/postCard';
import PostDetail from '../../component/post/post';
import Pagination from '../../component/common/Pagination';
import axiosInstance from '../../utils/axiosInstance';
import { usePagination } from '../../hooks/usePagination';
import { useToast } from '../../component/common/ToastProvider';
import { handleApiError } from '../../utils/errorHandler';

import Spot from '../../type/spot';
import Post from '../../type/post';

const SpotPage = () => {
  const router = useRouter();
  const { spotId } = router.query;
  const { showError } = useToast();
  const [spots, setSopts] = useState<Spot[]>([]);
  const [spotPosts, setSpotPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(false);
  const selectedSpot = spots.find((spot) => spot.id === Number(spotId));

  // 페이지네이션
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    itemsPerPage
  } = usePagination({
    totalItems: totalPosts,
    itemsPerPage: 12,
    initialPage: 1
  });

  // post modal
  const [openPost, setOpenPost] = useState<boolean>(false);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  const handlerPost = (postId: number) => {
    console.log('open Modal', postId);
    setHoveredPost(postId);
    setOpenPost(true);
  };

  const handleCloseModal = () => {
    setOpenPost(false);
  };

  // Spot 목록 가져오기
  useEffect(() => {
    axiosInstance
      .get('/api/spots')
      .then((response) => {
        console.log('/api/spots', response.data);
        setSopts(response.data);
      })
      .catch((error) => {
        console.log('/api/spots error', error);
        showError(handleApiError(error));
      });
  }, []);

  // 게시물 목록 가져오기
  useEffect(() => {
    if (spotId) {
      setLoading(true);
      axiosInstance
        .get(`/api/posts/spots/${spotId}`, {
          params: {
            page: currentPage,
            size: itemsPerPage,
          },
        })
        .then((response) => {
          console.log('/api/posts/spots/${spotId}', response.data);
          // 응답이 페이지네이션 정보를 포함하는 경우
          if (response.data.content) {
            setSpotPosts(response.data.content);
            setTotalPosts(response.data.totalElements);
          } else {
            // 응답이 배열인 경우
            setSpotPosts(response.data);
            setTotalPosts(response.data.length);
          }
        })
        .catch((error) => {
          console.log('/api/posts/spots/${spotId}', error);
          showError(handleApiError(error));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [spotId, currentPage, itemsPerPage]);

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
        {loading ? (
          <LoadingMessage>게시물을 불러오는 중...</LoadingMessage>
        ) : (
          <>
            <PostCard posts={spotPosts} handlerPost={handlerPost} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </Container>
      {openPost && <PostDetail postId={hoveredPost!} handleCloseModal={handleCloseModal} />}
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

const LoadingMessage = styled.div`
  width: 100%;
  padding: 40px;
  text-align: center;
  font-family: 'GmarketSansMedium';
  font-size: 18px;
  color: #666;
`;
