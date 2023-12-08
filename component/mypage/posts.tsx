import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Router from 'next/router';
import axiosInstance from '../../utils/axiosInstance';

import Post from '../../type/post';

const MyPagePosts: React.FC = (post) => {
  return (
    <Container>
      포스팅들
    </Container>
  );
};

export default MyPagePosts;

const Container = styled.div`
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
`;
