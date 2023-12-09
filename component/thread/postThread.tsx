import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import axiosInstance from '../../utils/axiosInstance';
import Header from '../../component/layout/header';
import Navigation from '../../component/layout/navigation';
import ImageSlider from './imageSlider';

import User from '../../type/user';
import Post from '../../type/post';

const PostThread: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const timeZone = 'Asia/Seoul';
    const formattedDateString = dateString.replace(/\[.*\]/, '');
    const zonedDate = utcToZonedTime(new Date(formattedDateString), timeZone);
    return format(zonedDate, 'yyyy-MM-dd HH:mm:ss');
  };

  return (
    <Container>
      {posts.map((post, index) => (
        <PostFrame>
          <PostInfoFrame>
            <PostUserInfo>
              <PostUserImage src={post.user.profileImageLink} alt='profileImage' />
              {post.user.nickname}
            </PostUserInfo>
            {formatDate(post.updatedAt)}
          </PostInfoFrame>
          <PostTtile> {post.title} </PostTtile>
          <PostContent> {post.content} </PostContent>
          <ImageSlider images={post.imageUrls} />
          <DivisionBar />
        </PostFrame>
      ))}
    </Container>
  );
};

export default PostThread;

const Container = styled.div`
  width: 70%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 735px) {
    width: 90%;
  }
`;

const DivisionBar = styled.div`
  width: 100%;
  border: 0.5px solid rgba(79, 76, 76, 0.4);
  margin-top: 5vh;
  margin-bottom: 5vh;

  @media (max-width: 735px) {
    margin-top: 3vh;
    margin-bottom: 0;
  }
`;

const PostFrame = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1%;
  box-sizing: border-box;

  @media (max-width: 735px) {
    padding: 3%;
  }
`;

const PostInfoFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: 'GmarketSansMedium';
  font-size: 1vw;
  color: #a4a4a4;
  margin-bottom: 2vh;

  @media (max-width: 735px) {
    font-size: 1.5vw;
  }
`;

const PostUserImage = styled.img`
  width: 8%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;

  @media (max-width: 735px) {
    width: 20%;
  }
`;

const PostUserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 2vw;
  font-family: 'GmarketSansMedium';
  font-size: 1vw;
  color: black;

  @media (max-width: 735px) {
    font-size: 3vw;
  }
`;
const PostTtile = styled.div`
  font-family: 'GmarketSansBold';
  font-size: 1.6vw;
  margin-bottom: 1vw;

  @media (max-width: 735px) {
    font-size: 4vw;
  }
`;

const PostContent = styled.div`
  font-family: 'GmarketSansMedium';
  font-size: 1vw;
  margin-bottom: 1vw;

  @media (max-width: 735px) {
    font-size: 2vw;
  }
`;
