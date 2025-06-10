import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import send from '../../public/send.png';
import axiosInstance from '../../utils/axiosInstance';
import CommentItem from '../comment/CommentItem';
import { useToast } from '../common/ToastProvider';
import { handleApiError } from '../../utils/errorHandler';

import HeaderContainer from './header';
import ContentInfoContainer from './contentInfo';
import FooterContainer from './footer';

import User from '../../type/user';
import Post from '../../type/post';
import Comment from '../../type/comment';

const ContentLayout: React.FC<{ postInfo: Post; postId: number }> = ({ postInfo, postId }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { showError } = useToast();

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
  }, []);

  useEffect(() => {
    // Comments;
    if (postId) {
      axiosInstance
        .get(`/api/posts/${postId}/comments`)
        .then((response) => {
          console.log('/api/posts/${postId}/comments', response.data);
          setComments(response.data);
        })
        .catch((error) => {
          console.log('/api/posts/${postId}/comments error', error);
          showError(handleApiError(error));
        });
    }
  }, [postId]);

  const handleCommentUpdate = (updatedComment: Comment) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
  };

  const handleCommentDelete = (commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const handleCommentAdd = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  return (
    <Frame>
      <HeaderContainer postInfo={postInfo} />
      <ContentInfoContainer
        postInfo={postInfo}
        comments={comments}
        commentsLength={comments.length}
        currentUser={userInfo}
        onCommentUpdate={handleCommentUpdate}
        onCommentDelete={handleCommentDelete}
      />
      <FooterContainer 
        userInfo={userInfo!} 
        postId={postId}
        onCommentAdd={handleCommentAdd}
      />
    </Frame>
  );
};

export default ContentLayout;

const Frame = styled.div`
  width: 40%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2%;
  box-sizing: border-box;

  @media (max-width: 735px) {
    width: 90%;
    height: auto;
  }
`;
