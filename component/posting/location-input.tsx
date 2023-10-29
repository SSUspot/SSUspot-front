import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LocationInput: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const places = [
    "남산타워",
    "서울숲",
    "광안리 해수욕장",
    "석촌호수",
    "노들섬",
    "반포 한강공원",
  ];

  const handlePlaceClick = (place: string) => {
    setSelectedPlace(place);
    setShowDropdown(false);
  };

  return (
    <>
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
            <PlaceItem key={place} onClick={() => handlePlaceClick(place)}>
              {place}
            </PlaceItem>
          ))}
        </Dropdown>
      )}
      {!showDropdown && <Button>게시하기</Button>}
    </>
  );
};

const Input = styled.input`
  display: block;
  width: 550px;
  border: none;
  outline: none;
  padding: 10px;
  margin-top: 5px;
  font-size: 15px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  &:focus {
    border: solid 1px #999;
    border-radius: 3px;
  }
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

const Button = styled.div`
  cursor: pointer;
  display: flex;
  width: 100px;
  height: 30px;
  margin-top: 10px;
  margin-left: 240px;
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

export default LocationInput;
