import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import axiosInstance from '../../utils/axiosInstance';
import Header from '../../component/layout/header';
import Navigation from '../../component/layout/navigation';

import User from '../../type/user';
import Post from '../../type/post';

const MyPage: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <>
      <Header />
      <Navigation />
      <Container>게시물입니다.</Container>
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
