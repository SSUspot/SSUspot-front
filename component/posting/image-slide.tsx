import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { BsFillCameraFill } from 'react-icons/bs';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const MAX_IMAGES = 10;

interface ImageSlideProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageSlide: React.FC<ImageSlideProps> = ({ images, setImages }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files;
    if (selectedImages && selectedImages.length + images.length <= MAX_IMAGES) {
      setImages([...images, ...Array.from(selectedImages)]);
    } else {
      alert(`이미지는 최대 ${MAX_IMAGES}개까지만 업로드 가능합니다.`);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setCurrentSlide((prev) => (index === prev ? Math.max(prev - 1, 0) : prev));
  };

  const changeSlide = (direction: 'next' | 'prev') => {
    setCurrentSlide((prev) => {
      const maxSlideIndex =
        images.length < MAX_IMAGES ? images.length : images.length - 1;
      return direction === 'next'
        ? Math.min(prev + 1, maxSlideIndex)
        : Math.max(prev - 1, 0);
    });
  };

  return (
    <>
      <ImagesContainer>
        <ArrowButton
          className="prev"
          onClick={() => changeSlide('prev')}
          disabled={currentSlide === 0}
        >
          &#10094; {/* Left arrow */}
        </ArrowButton>
        <SlideshowWrapper
          style={{ transform: `translateX(-${currentSlide * 600}px)` }}
        >
          {images.map((file, index) => (
            <TransformWrapper
              key={index}
              limitToBounds={true}
              panning={{ disabled: false }}
            >
              <TransformComponent>
                <ImageWrapper>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded ${index + 1}`}
                    width={600}
                    height={600}
                  />
                  <RemoveButton onClick={() => handleRemoveImage(index)}>
                    X
                  </RemoveButton>
                </ImageWrapper>
              </TransformComponent>
            </TransformWrapper>
          ))}
          {images.length < MAX_IMAGES && (
            <ImageBox>
              <Label htmlFor="imageInput">
                <BsFillCameraFill size={50} />
                <span style={{ fontSize: '1rem' }}>이미지 추가</span>
              </Label>
              <ImageInput
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
              />
            </ImageBox>
          )}
        </SlideshowWrapper>
        <ArrowButton
          className="next"
          onClick={() => changeSlide('next')}
          disabled={
            currentSlide ===
            (images.length < MAX_IMAGES ? images.length : images.length - 1)
          }
        >
          &#10095;
        </ArrowButton>
      </ImagesContainer>
    </>
  );
};

export default ImageSlide;

const ImageBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;

  &:hover {
    border-color: #2146c7;
  }
`;

const Label = styled.label`
  color: white;
  cursor: pointer;
`;

const ImageInput = styled.input`
  display: none;
  cursor: pointer;
`;

const ImagesContainer = styled.div`
  width: 600px;
  height: 600px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 2px solid #ccc;
`;

const SlideshowWrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 24px;
  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
`;

const ImageWrapper = styled.div`
  width: 600px;
  height: 600px;
  min-width: 600px;
  min-height: 600px;
  position: relative;
  overflow: hidden;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  color: white;
  padding: 5px;
  cursor: pointer;
  font-size: 16px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
`;
