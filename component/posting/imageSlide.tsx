import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { BsFillCameraFill } from 'react-icons/bs';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const MAX_IMAGES = 10;

interface ImageSlideProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

interface SlideshowWrapperProps {
  currentSlide: number;
}

const ImageSlide: React.FC<ImageSlideProps> = ({ images, setImages }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    imageUrls.forEach((url) => URL.revokeObjectURL(url));
    const newImageUrls = images.map((file) => URL.createObjectURL(file));
    setImageUrls(newImageUrls);

    return () => {
      newImageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

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
        <SlideshowWrapper currentSlide={currentSlide}>
          {images.map((file, index) => (
            <TransformWrapper
              key={index}
              limitToBounds={true}
              panning={{ disabled: false }}
            >
              <TransformComponent>
                <ImageWrapper>
                  <Image
                    src={imageUrls[index]}
                    alt={`Uploaded ${index + 1}`}
                    layout="fill"
                    objectFit="contatin"
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

const ImagesContainer = styled.div`
  width: 80vh;
  height: 80vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 3vh;

  @media (max-width: 735px) {
    width: 95vw;
    height: 95vw;
  }
`;

const ImageBox = styled.div`
  width: 80vh;
  height: 80vh;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2vw;

  &:hover {
    border-color: #2146c7;
  }

  @media (max-width: 735px) {
    width: 95vw;
    height: 95vw;
    font-size: 4vw;
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

const SlideshowWrapper = styled.div<SlideshowWrapperProps>`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(-${(props) => props.currentSlide * 80}vh);

  @media (max-width: 735px) {
    transform: translateX(-${(props) => props.currentSlide * 95}vw);
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 1vh;
  font-size: 16px;
  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  &.prev {
    left: 1vh;
  }

  &.next {
    right: 1vh;
  }

  @media (max-width: 735px) {
    top: auto;
    bottom: 40%;
    font-size: 6vw;
  }
`;

const ImageWrapper = styled.div`
  width: 80vh;
  height: 80vh;
  position: relative;
  overflow: hidden;

  @media (max-width: 735px) {
    width: 95vw;
    height: 95vw;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: white;
  padding: 0.5vh;
  cursor: pointer;
  font-size: 16px;
  text-shadow: 0.1vh 0.1vh rgba(0, 0, 0, 0.3);

  @media (max-width: 735px) {
    font-size: 6vw;
  }
`;
