import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import ImageSlider from '../../component/thread/imageSlider';
import axiosInstance from '../../utils/axiosInstance';

import User from '../../type/user';
import Post from '../../type/post';

const PhotoLayout: React.FC<{ postInfo: Post }> = ({ postInfo }) => {
  return (
    <ImageFrame>
      <ImageSlider images={postInfo.imageUrls} />
    </ImageFrame>
  );
};

export default PhotoLayout;

const ImageFrame = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
