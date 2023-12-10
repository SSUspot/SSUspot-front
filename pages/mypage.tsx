import Head from 'next/head';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Modal from '../component/common/modal';
import Navigation from '../component/layout/navigation';
import axiosInstance from '../utils/axiosInstance';
import Header from '../component/layout/header';
import MyPageHeader from '../component/mypage/header';
import MyPagePosts from '../component/mypage/posts';
import PostDetail from '../component/post/post';

import User from '../type/user';
import Post from '../type/post';

const MyPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const [userPosts, setUserPosts] = useState<Post[]>([]);

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

  useEffect(() => {
    // User;
    axiosInstance
      .get('/api/users')
      .then((response) => {
        console.log('/api/users', response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log('/api/users error', error);
      });
    // Post
    axiosInstance
      .get('/api/posts/users/me', {
        params: {
          page: 1,
          size: 10,
        },
      })
      .then((response) => {
        console.log('/api/posts/users/me', response.data);
        setUserPosts(response.data);
      })
      .catch((error) => {
        console.log('/api/posts/users/me', error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>SSUspot</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Header />
      <Navigation />
      <Container>
        <MyPageHeader userInfo={userInfo} postLength={userPosts.length} />
        <DivisionBar />
        <MyPagePosts userPosts={userPosts} handlerPost={handlerPost} />
      </Container>
      {openPost && <PostDetail postId={hoveredPost} handleCloseModal={handleCloseModal} />}
    </>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DivisionBar = styled.div`
  width: 85%;
  border: 0.5px solid rgba(79, 76, 76, 0.4);
  margin-bottom: 5vh;

  @media (max-width: 735px) {
    margin-bottom: 3vh;
  }
`;
