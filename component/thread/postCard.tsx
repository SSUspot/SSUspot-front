import { useState, useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import axiosInstance from '../../utils/axiosInstance';
import ImageSlider from './imageSlider';

import like from '../../public/like.png';
import comment from '../../public/comment.png';

import User from '../../type/user';
import Post from '../../type/post';

const PostCard: React.FC<{ posts: Post[]; handlerPost: (postId: number) => void }> = ({
  posts,
  handlerPost,
}) => {
  const [commentCounts, setCommentCounts] = useState<number[]>([]);

  const fetchCommentCount = async (postId: number) => {
    try {
      const response = await axiosInstance.get(`/api/posts/${postId}/comments`);
      return response.data.length;
    } catch (error) {
      console.error(`/api/posts/${postId}/comments error`, error);
      return 0;
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const counts = await Promise.all(posts.map((post) => fetchCommentCount(post.id)));
      setCommentCounts(counts);
    };

    fetchComments();
  }, [posts]);

  return (
    <Container>
      <PostGrid>
        {posts.map((post, index) => (
          <PostFrame onClick={() => handlerPost(post.id)}>
            <PostInfoFrame>
              <PostUserImage src={post.user.profileImageLink} alt='profileImage' />
              {post.user.nickname}
            </PostInfoFrame>
            <ImageSlider images={post.imageUrls} />
            <PostIconFrame>
              <PostIcon src={like} alt='like' />
              <p> 0 </p>
              <PostIcon src={comment} alt='comment' />
              <p> {commentCounts[index]} </p>
            </PostIconFrame>
            <PostTtile> {post.title} </PostTtile>
            <PostContent> {post.content} </PostContent>
          </PostFrame>
        ))}
      </PostGrid>
    </Container>
  );
};

export default PostCard;

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 1vh 4vh;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;

  @media (max-width: 735px) {
    padding: 1vh;
  }
`;

const PostGrid = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
  gap: 0.5vw;
  margin: 0 auto;

  @media (max-width: 735px) {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
    width: 90%;
  }
`;

const PostFrame = styled.div`
  position: relative;
  width: 95%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 7%;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-bottom: 2vh;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.03);
    transition: 0.3s;
  }

  @media (max-width: 735px) {
    padding: 3%;
  }
`;

const PostInfoFrame = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-family: 'GmarketSansBold';
  font-size: 1vw;
  margin-bottom: 2vh;
  gap: 1vw;

  @media (max-width: 735px) {
    font-size: 2vw;
    margin-bottom: 1vh;
    gap: 2vw;
  }
`;

const PostUserImage = styled.img`
  width: 15%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;

  @media (max-width: 735px) {
    width: 20%;
  }
`;

const PostIconFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1vh;
  font-size: 1vw;

  @media (max-width: 735px) {
    font-size: 2vw;
    gap: 1vw;
  }
`;

const PostIcon = styled(Image)`
  width: 20px;
  height: 20px;
  padding: 10px 0;

  @media (max-width: 735px) {
    width: 10px;
    height: 10px;
    padding: 5px 0;
  }
`;

const PostTtile = styled.div`
  width: 100%;
  font-family: 'GmarketSansBold';
  font-size: 1.5vw;
  margin: 1vw 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 735px) {
    font-size: 3vw;
  }
`;

const PostContent = styled.div`
  width: 100%;
  font-family: 'GmarketSansMedium';
  font-size: 0.8vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 735px) {
    font-size: 2vw;
  }
`;
