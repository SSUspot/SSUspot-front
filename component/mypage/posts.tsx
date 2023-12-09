import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Router from 'next/router';
import axiosInstance from '../../utils/axiosInstance';

import Post from '../../type/post';

const MyPagePosts: React.FC<{ userPosts: Post[] }> = ({ userPosts }) => {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  const handlerPost = (postId: number) => {
    Router.push(`/post/${postId}`);
  };

  return (
    <Container>
      {userPosts.length === 0 ? (
        <p> 게시물이 없습니다. </p>
      ) : (
        <PostGrid>
          {userPosts.map((post, index) => (
            <PostImageWrapper
              key={post.id}
              onMouseEnter={() => setHoveredPost(index)}
              onMouseLeave={() => setHoveredPost(null)}
              onClick={() => handlerPost(post.id)}
            >
              {hoveredPost === index && (
                <Overlay>
                  <OverlayContent> 게시물 보기 </OverlayContent>
                </Overlay>
              )}
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
  font-family: 'GmarketSansMedium';
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
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverlayContent = styled.div`
  color: white;
`;
