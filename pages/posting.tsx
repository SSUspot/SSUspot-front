import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../component/layout/header';
import styled from 'styled-components';
import axiosInstance from '../utils/axiosInstance';
import ImageSlide from '../component/posting/imageSlide';
import HashTag from '../component/posting/hashTag';

import User from '../type/user';

interface Place {
  id: number;
  spotName: string;
  spotThumbnailImageLink: string;
  spotLevel: number;
  latitude: number;
  longitude: number;
}

const Posting: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [spotId, setSpotId] = useState<number>(1);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [hashTags, setHashTags] = useState<string[]>([]);
  const router = useRouter();

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

    // places
    axiosInstance
      .get('/api/spots')
      .then((response) => {
        console.log('api/spots', response.data);
        setPlaces(response.data);
      })
      .catch((error) => {
        console.log('/api/spots error', error);
      });
  }, []);

  const handlePlaceClick = (place: { id: number; spotName: string }) => {
    setSpotId(place.id);
    setSelectedPlace(place.spotName);
    setShowDropdown(false);
  };

  const uploadImages = async () => {
    try {
      const urls = await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
          formData.append('image', image);

          const response = await axiosInstance.post('/api/images', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data[0].imageUrl);
          return response.data[0].imageUrl;
        })
      );
      return urls;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      const uploadedUrls = await uploadImages();

      const postData = {
        title,
        content,
        tags: hashTags,
        imageUrls: uploadedUrls,
        spotId,
      };

      const response = await axiosInstance.post('/api/posts', postData);

      if (response.status === 200) {
        console.log(response);
        router.push('/main/list');
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <LeftColumn>
          <ImageSlide images={images} setImages={setImages} />
        </LeftColumn>
        <DivisionBar />
        <RightColumn>
          <Info>
            {userInfo?.profileImageLink && (
              <StyledImage
                src={userInfo.profileImageLink}
                alt=""
                width={50}
                height={50}
              ></StyledImage>
            )}
            {userInfo?.nickname}
          </Info>
          <InputWrapper>
            <Label>제목</Label>
            <Input
              type="text"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label>내용</Label>
            <TextArea
              placeholder="내용을 입력해주세요"
              rows={4}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label>해시태그</Label>
            <HashTag hashTags={hashTags} setHashTags={setHashTags} />
          </InputWrapper>
          <InputWrapper>
            <Label>위치</Label>
            <Input
              type="text"
              value={selectedPlace}
              placeholder="위치를 검색하세요"
              onClick={() => setShowDropdown(!showDropdown)}
              readOnly
            />
            {showDropdown && (
              <Dropdown>
                {places.map((place) => (
                  <PlaceItem
                    key={place.id}
                    onClick={() => handlePlaceClick(place)}
                  >
                    {place.spotName}
                  </PlaceItem>
                ))}
              </Dropdown>
            )}
          </InputWrapper>
          {!showDropdown && <Button onClick={handleSubmit}>게시하기</Button>}
        </RightColumn>
      </Container>
    </>
  );
};

export default Posting;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 50vw 1px 50vw;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;

  @media (max-width: 735px) {
    display: block;
    padding-top: 1vh;
  }
`;

const DivisionBar = styled.div`
  width: 0.1vw;
  height: 80vh;
  background-color: rgba(0, 0, 0, 0.2);

  @media (max-width: 735px) {
    width: 100%;
    height: 2px;
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const Column = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const LeftColumn = styled(Column)`
  padding-top: 2vh;

  @media (max-width: 735px) {
    padding-top: 1vh;
  }
`;

const RightColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5vh;

  @media (max-width: 735px) {
    padding-top: 3vh;
  }
`;

const Info = styled.div`
  width: 80%;
  height: 10vh;
  padding: 0px 1vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2vh;

  @media (max-width: 735px) {
    width: 95%;
  }
`;

const StyledImage = styled.img`
  border-radius: 50%;
`;

const Input = styled.input`
  display: block;
  width: 80%;
  border: none;
  outline: none;
  padding: 1vh;
  margin-top: 2vh;
  font-size: 2vh;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  &:focus {
    border: solid 1px #999;
    border-radius: 3px;
  }

  @media (max-width: 735px) {
    width: 95%;
  }
`;

const Button = styled.div`
  cursor: pointer;
  display: flex;
  width: 15vh;
  height: 4vh;
  background-color: rgba(50, 80, 210, 0.7);
  border-radius: 3vh;
  font-size: 2vh;
  border: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: #ffffff;

  &:hover {
    background-color: rgba(48, 55, 205, 0.7);
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 80%;
  margin-top: 2vh;
  margin-bottom: 3vh;

  @media (max-width: 735px) {
    width: 95%;
  }
`;

const TextArea = styled.textarea`
  display: block;
  width: 80%;
  border: none;
  outline: none;
  padding: 1vh;
  margin-top: 2vh;
  font-size: 2vh;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  box-sizing: border-box;
  resize: none;

  &:focus {
    border: solid 1px #999;
    border-radius: 3px;
  }

  @media (max-width: 735px) {
    width: 95%;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 2.5vh;
  font-weight: 500;
  padding-left: 0.5vh;
`;

const Dropdown = styled.div`
  position: relative;
  width: 80vh;
  border: 1px solid #999;
  border-radius: 3px;
  max-height: 20vh;
  overflow-y: auto;
`;

const PlaceItem = styled.div`
  padding: 1.5vh;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;
