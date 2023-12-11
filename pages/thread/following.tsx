import Head from 'next/head';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Navigation from '../../component/layout/navigation';
import axiosInstance from '../../utils/axiosInstance';
import Header from '../../component/layout/header';
import PostCard from '../../component/thread/postCard';
import PostDetail from '../../component/post/post';

import User from '../../type/user';
import Post from '../../type/post';

const FollowingThread: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const selectedSpot = posts.find((post) => post.id === Number(1));

  // post modal
  const [openPost, setOpenPost] = useState<boolean>(false);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

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
      .get('/api/posts/recommend')
      .then((response) => {
        console.log('/api/posts/recommend', response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.log('/api/posts/recommend error', error);
      });
  }, []);

  const handlerPost = (postId: number) => {
    console.log('open Modal', postId);
    setHoveredPost(postId);
    setOpenPost(true);
  };

  const handleCloseModal = () => {
    setOpenPost(false);
  };

  return (
    <>
      <Head>
        <title>SSUspot</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Header />
      <Navigation />
      <Container>
        <PostsInfo> 당신에게 딱 맞는 추천 게시물을 확인해보세요. </PostsInfo>
        <PostsSubInfo> 여러분을 매료시킬 이야기들이 기다리고 있어요! 📸✨ </PostsSubInfo>
        <PostCard posts={posts} handlerPost={handlerPost} />
      </Container>
      {openPost && <PostDetail postId={hoveredPost!} handleCloseModal={handleCloseModal} />}
    </>
  );
};

export default FollowingThread;

const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostsInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'GmarketSansBold';
  font-size: 4vh;
  margin-bottom: 2vh;
  margin-top: 4vh;

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

const DivisionBar = styled.div`
  width: 85%;
  border: 0.5px solid rgba(79, 76, 76, 0.4);
  margin-bottom: 5vh;

  @media (max-width: 735px) {
    margin-bottom: 3vh;
  }
`;
