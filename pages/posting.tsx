import { useEffect, useState } from 'react';
import { UserInfo } from '../states/state';
import axios from 'axios';
import Header from '../component/layout/header';
import styled from 'styled-components';
import ImageSlide from '../component/posting/image-slide';
import HashTag from '../component/posting/hash-tag';

const Posting: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [spotId, setSpotId] = useState<number>(1);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [places, setPlaces] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/spots');
        setPlaces(response.data);
        console.log(places);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaces();
  }, []);

  const handlePlaceClick = (place: string) => {
    setSelectedPlace(place);
    setShowDropdown(false);
  };
  console.log({ title, content, imageUrls, spotId });

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/posts', {
        title,
        content,
        imageUrls,
        spotId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Column>
          <ImageSlide />
        </Column>
        <Column>
          <DivisionBar />
        </Column>
        <Column>
          <Info>
            {user?.profileImageLink && (
              <StyledImage
                src={user.profileImageLink}
                alt=""
                width={50}
                height={50}
              ></StyledImage>
            )}
            {user?.nickname}
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
            <HashTag />
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
                <PlaceItem
                //onClick={() => handleAddPlace(prompt("새로운 장소를 입력하세요:"))}
                >
                  장소 추가하기
                </PlaceItem>
                {places.map((place) => (
                  <PlaceItem
                    key={place}
                    onClick={() => handlePlaceClick(place)}
                  >
                    {place}
                  </PlaceItem>
                ))}
              </Dropdown>
            )}
          </InputWrapper>
          {!showDropdown && <Button onClick={handleSubmit}>게시하기</Button>}
        </Column>
      </Container>
    </>
  );
};

export default Posting;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  align-items: center;
  justify-items: center;
  padding-top: 50px;
`;

const DivisionBar = styled.div`
  width: 2px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Column = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:nth-child(1) {
    padding-top: 20px;
  }

  &:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;

const Info = styled.div`
  width: 600px;
  height: 50px;
  padding: 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const StyledImage = styled.img`
  border-radius: 25px;
`;

const Input = styled.input`
  display: block;
  width: 550px;
  border: none;
  outline: none;
  padding: 10px;
  margin-top: 5px;
  font-size: 16px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  &:focus {
    border: solid 1px #999;
    border-radius: 3px;
  }
`;

const Button = styled.div`
  cursor: pointer;
  display: flex;
  width: 100px;
  height: 30px;
  background-color: rgba(50, 80, 210, 0.7);
  border-radius: 15px;
  font-size: 16px;
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
  width: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
  }
`;

const TextArea = styled.textarea`
  display: block;
  width: 550px;
  border: none;
  outline: none;
  padding: 10px;
  margin-top: 5px;
  font-size: 16px;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  box-sizing: border-box;
  resize: none;
  &:focus {
    border: solid 1px #999;
    border-radius: 3px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 500;
  padding-left: 5px;
`;

const Dropdown = styled.div`
  position: relative;
  width: 550px;
  border: 1px solid #999;
  border-radius: 5px;
  max-height: 100px;
  overflow-y: auto;
`;

const PlaceItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;
