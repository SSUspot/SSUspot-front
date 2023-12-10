import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Header from '../../component/layout/header';
import Navigation from '../../component/layout/navigation';
import axiosInstance from '../../utils/axiosInstance';
import PhotoLayout from '../../component/post/photoLayout';
import ContentLayout from '../../component/post/contentLayout';

import User from '../../type/user';
import Post from '../../type/post';

const PostDetail: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;
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

  if (!postInfo) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Header />
      <Navigation />
      <Content>
        <PhotoLayout postInfo={postInfo} />
        <ContentLayout postInfo={postInfo} postId={postId} />
      </Content>
    </Container>
  );
};

export default PostDetail;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Content = styled.div`
  width: 80%;
  height: 75%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
  box-sizing: border-box;
  border: 1px solid;
`;
