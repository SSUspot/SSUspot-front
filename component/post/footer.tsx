import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import send from '../../public/send.png';
import like from '../../public/like.png';
import commentIcon from '../../public/comment.png';
import axiosInstance from '../../utils/axiosInstance';
import { useToast } from '../common/ToastProvider';
import { handleApiError } from '../../utils/errorHandler';

import User from '../../type/user';
import Comment from '../../type/comment';

interface FooterContainerProps {
  userInfo: User;
  postId: number;
  onCommentAdd?: (comment: Comment) => void;
}

const FooterContainer: React.FC<FooterContainerProps> = ({ userInfo, postId, onCommentAdd }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { showError } = useToast();

  const sendComment = () => {
    if (!comment.trim()) {
      showError('댓글 내용을 입력해주세요.');
      return;
    }

    if (postId && !loading) {
      setLoading(true);
      axiosInstance
        .post(`/api/posts/${postId}/comments`, {
          content: comment,
        })
        .then((response) => {
          console.log('/api/posts/${postId}/comments', response.data);
          setComment('');
          if (onCommentAdd) {
            onCommentAdd(response.data);
          }
        })
        .catch((error) => {
          console.log('/api/posts/${postId}/comments error', error);
          showError(handleApiError(error));
        })
        .finally(() => {
          setLoading(false);
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
        disabled={loading}
        data-testid="comment-input"
      />
      <ButtonFrame onClick={sendComment}>
        <ButtonImage src={send} alt='send' data-testid="comment-submit" />
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

  @media (max-width: 735px) {
    width: 100%;
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
`;
