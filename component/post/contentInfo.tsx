import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import axiosInstance from '../../utils/axiosInstance';
import setting from '../../public/setting.png';
import like from '../../public/like.png';
import commentIcon from '../../public/comment.png';

import User from '../../type/user';
import Post from '../../type/post';
import Comment from '../../type/comment';

const ContentInfoContainer: React.FC<{
  postInfo: Post;
  comments: Comment[];
  commentsLength: number;
}> = ({ postInfo, comments, commentsLength }) => {
  const dateTimeString = postInfo.createdAt.split('[')[0];
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <Container>
      <PostTtile> {postInfo.title} </PostTtile>
      <PostContent> {postInfo.content} </PostContent>
      <PostDate> {formattedDate} </PostDate>
      <PostInfoFrame>
        <PostIcon src={like} alt='like' />
        <p>0</p>
        <PostIcon src={commentIcon} alt='comment' />
        <p>{commentsLength}</p>
      </PostInfoFrame>
      {comments.map((comment, index) => (
        <CommentFrame>
          <ButtonFrame>
            <ProfileImage src={comment.user.profileImageLink} alt='Profile Image' />
          </ButtonFrame>
          <CommentText>
            <Nickname> {comment.user.nickname} &nbsp; </Nickname>
            <ContentText> {comment.content} </ContentText>
          </CommentText>
          <ButtonFrame>
            <ButtonImage src={setting} alt='setting' />
          </ButtonFrame>
        </CommentFrame>
      ))}
    </Container>
  );
};

export default ContentInfoContainer;

const Container = styled.div`
  height: 85%;
  overflow: scroll;
  box-sizing: border-box;

  @media (max-width: 735px) {
    height: auto;
  }
`;

const PostInfoFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: 'GmarketSansBold';
  font-size: 2vh;
  gap: 1vh;
  padding: 1% 0;

  p {
    margin-left: 0.5vh;
  }

  img {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 735px) {
    font-size: 1.5vh;

    img {
      width: 15px;
      height: 15px;
    }
  }
`;

const PostIcon = styled(Image)``;

const PostTtile = styled.div`
  width: 100%;
  font-family: 'GmarketSansBold';
  font-size: 1.5vw;
  margin: 1vw 0;

  @media (max-width: 735px) {
    font-size: 4vw;
  }
`;

const PostContent = styled.div`
  width: 100%;
  font-family: 'GmarketSansMedium';
  font-size: 1vw;
  line-height: 120%;

  @media (max-width: 735px) {
    font-size: 3vw;
  }
`;

const PostDate = styled.div`
  width: 100%;
  padding: 1% 0;
  font-family: 'GmarketSansMedium';
  font-size: 0.8vw;
  color: rgba(79, 76, 76, 0.4);

  @media (max-width: 735px) {
    font-size: 2.5vw;
  }
`;

const CommentFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-family: 'GmarketSansMedium';
  font-size: 1vw;
  padding: 3% 0;
  box-sizing: border-box;
  gap: 1vw;

  @media (max-width: 735px) {
    font-size: 3vw;
  }
`;

const ButtonFrame = styled.div`
  width: 8%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonImage = styled(Image)`
  width: 60%;
  height: auto;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
`;

const CommentText = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;

const Nickname = styled.span`
  font-family: 'GmarketSansBold';
`;

const ContentText = styled.span`
  font-family: 'GmarketSansMedium';
`;
