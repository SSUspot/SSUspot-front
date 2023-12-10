import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import send from '../../public/send.png';
import like from '../../public/like.png';
import commentIcon from '../../public/comment.png';
import axiosInstance from '../../utils/axiosInstance';

import User from '../../type/user';

const FooterContainer: React.FC<{ userInfo: User; postId: number }> = ({ userInfo, postId }) => {
  const [comment, setComment] = useState('');

  const sendComment = () => {
    if (postId) {
      axiosInstance
        .post(`/api/posts/${postId}/comments`, {
          content: comment,
        })
        .then((response) => {
          console.log('/api/posts/${postId}/comments', response.data);
          setComment('');
        })
        .catch((error) => {
          console.log('/api/posts/${postId}/comments error', error);
        });
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      sendComment();
    }
  };

  return (
    <InputFrame>
      <ButtonFrame onClick={sendComment}>
        {userInfo && <ProfileImage src={userInfo.profileImageLink} alt='Profile Image' />}
      </ButtonFrame>
      <Input
        type='text'
        placeholder='댓글 달기 ...'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <ButtonFrame onClick={sendComment}>
        <ButtonImage src={send} alt='send' />
      </ButtonFrame>
    </InputFrame>
  );
};

export default FooterContainer;

const InputFrame = styled.div`
  width: 100%;
  height: auto;
  background-color: rgba(216, 207, 207, 0.2);
  border-radius: 5px;
  margin: 2% 0;
  padding: 3%;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
`;

const Input = styled.input.attrs({ required: true })`
  width: 90%;
  height: auto;
  background-color: transparent;
  padding: 0 3%;
  border: none;
  cursor: pointer;
  font-family: 'GmarketSansMedium';
  font-size: 2vh;
  &:focus {
    outline: none;
  }
`;

const ButtonFrame = styled.div`
  width: 10%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonImage = styled(Image)`
  width: 70%;
  height: auto;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 80%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;

  @media (max-width: 735px) {
    width: 20%;
  }
`;
