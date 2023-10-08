import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import { BsFillCameraFill } from "react-icons/bs";

const ImageSlide: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files;
    const imageUrls: string[] = [];

    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.result && typeof reader.result === "string") {
            imageUrls.push(reader.result);
            if (imageUrls.length === selectedImages.length) {
              setImages(imageUrls);
            }
          }
        };
        reader.readAsDataURL(selectedImages[i]);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    if (index < images.length - 1) {
      setCurrentSlide(index);
    } else {
      setCurrentSlide(index - 1);
    }
    setImages(updatedImages);
  };

  const handleNextSlide = () => {
    if (currentSlide < images.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <>
      {!images.length ? (
        <ImageBox>
          <Label htmlFor="imageInput">
            <BsFillCameraFill size={50} />
          </Label>
          <ImageInput
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
        </ImageBox>
      ) : (
        <ImagesContainer>
          <ArrowButton
            className="prev"
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
          >
            &#10094; {/* Left arrow */}
          </ArrowButton>
          <SlideshowWrapper
            style={{
              transform: `translateX(-${currentSlide * 600}px)`,
            }}
          >
            {images.map((imageUrl, index) => (
              <ImagePreview key={index}>
                <Image
                  src={imageUrl}
                  alt={`Uploaded ${index + 1}`}
                  width={600}
                  height={600}
                  layout="responsive"
                />
                <RemoveButton onClick={() => handleRemoveImage(index)}>
                  X
                </RemoveButton>
              </ImagePreview>
            ))}
          </SlideshowWrapper>
          <ArrowButton
            className="next"
            onClick={handleNextSlide}
            disabled={currentSlide === images.length - 1}
          >
            &#10095; {/* Right arrow */}
          </ArrowButton>
        </ImagesContainer>
      )}
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
  border: 2px solid #ccc;
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
  position: relative;
  display: flex;
  align-items: center;
  width: 600px;
  height: 600px;
  overflow: hidden;
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

const ImagePreview = styled.div`
  position: relative;
  overflow: hidden;
  width: 600px;
  height: 600px;
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
