// ImageSlider.js
import React, { useState } from 'react';
import styled from 'styled-components';

const ImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <ImageSliderContainer>
      {images.length > 1 && (
        <>
          <LeftArrowButton onClick={prevImage}>{'<'}</LeftArrowButton>
          <RightArrowButton onClick={nextImage}>{'>'}</RightArrowButton>
        </>
      )}
      <PostImage src={images[currentImageIndex]} alt='Post Image' />
    </ImageSliderContainer>
  );
};

export default ImageSlider;

const ImageSliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  height: 0;
  overflow: hidden;
`;
const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  z-index: 1;
  color: #d9d9d9;

  &:focus {
    outline: none;
  }

  &:hover {
    color: white;
    transition: color 0.3s ease;
  }

  @media (max-width: 735px) {
    padding: 3%;
    font-size: 15px;
  }
`;

const LeftArrowButton = styled(ArrowButton)`
  left: 10px;
  @media (max-width: 735px) {
    left: 5px;
  }
`;

const RightArrowButton = styled(ArrowButton)`
  right: 10px;
  @media (max-width: 735px) {
    right: 5px;
  }
`;

const PostImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
`;
