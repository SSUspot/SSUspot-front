import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Router from 'next/router';
import axiosInstance from '../../utils/axiosInstance';

import Post from '../../type/post';

const MyPagePosts: React.FC<{ userPosts: Post[] }> = ({ userPosts }) => {
  return (
    <Container>
      {userPosts.length === 0 ? (
        <p> 게시물이 없습니다. </p>
      ) : (
        <PostGrid>
          {userPosts.map((post) => (
            <PostImageWrapper key={post.id}>
              <PostImage src={post.imageUrls[0]} alt={post.title} />
            </PostImageWrapper>
          ))}
        </PostGrid>
      )}
    </Container>
  );
};

export default MyPagePosts;

const Container = styled.div`
  width: 100%;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
`;

const PostGrid = styled.div`
  width: 85%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
  gap: 0.5vw;
  margin: 0 auto;
`;

const PostImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
