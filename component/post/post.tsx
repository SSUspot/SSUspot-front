import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Header from '../layout/header';
import Navigation from '../layout/navigation';
import axiosInstance from '../../utils/axiosInstance';
import PhotoLayout from './photoLayout';
import ContentLayout from './contentLayout';

import User from '../../type/user';
import Post from '../../type/post';

const PostDetail: React.FC<{ postId: number; handleCloseModal: () => void }> = ({
  postId,
  handleCloseModal,
}) => {
  const router = useRouter();
  // const { postId } = router.query;
  const [postInfo, setPostInfo] = useState<Post>();

  useEffect(() => {
    if (postId) {
      axiosInstance
        .get(`/api/posts/${postId}`)
        .then((response) => {
          console.log(`/api/posts/${postId}`, response.data);
          setPostInfo(response.data);
        })
        .catch((error) => {
          console.log(`/api/posts/${postId}`, error);
        });
    }
  }, [postId]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  if (!postInfo) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container onClick={handleOverlayClick}>
      <Content>
        <PhotoLayout postInfo={postInfo} />
        <ContentLayout postInfo={postInfo} postId={postId} />
      </Content>
    </Container>
  );
};

export default PostDetail;

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

const Content = styled.div`
  width: 80%;
  height: 85%;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0.25, 0, 0.25);
  box-sizing: border-box;
`;
