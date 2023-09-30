import Header from "../component/layout/header";
import styled from "styled-components";
import { useState } from "react";
import { ModalContent } from "./mypage";

const Posting: React.FC = () => {
  const nickname = "이시현";
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Column>
          {image ? (
            <ImagePreview src={image} alt="Uploaded" />
          ) : (
            <ImageBox>
              <label htmlFor="imageInput">사진 업로드</label>
              <ImageInput
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </ImageBox>
          )}
        </Column>
        <Column>
          <DivisionBar />
        </Column>
        <Column>
          <Info>
            <StyledImage
              src="https://picsum.photos/150"
              alt=""
              width={50}
              height={50}
            ></StyledImage>
            {nickname}
          </Info>
          <InputWrapper>
            <Label>제목</Label>
            <Input type="text" required />
          </InputWrapper>
          <InputWrapper>
            <Label>내용</Label>
            <TextArea rows={4} />
          </InputWrapper>
          <InputWrapper>
            <Label>태그</Label>
            <Input type="text" required />
          </InputWrapper>
          <InputWrapper>
            <Label>위치</Label>
            <Input type="text" required />
          </InputWrapper>
          <Button>게시하기</Button>
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
  padding: 100px 50px;
`;

const ImageBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;

  &:hover {
    cursor: pointer;
  }
`;

const ImageInput = styled.input`
  display: none;

  &:hover {
    cursor: pointer;
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const DivisionBar = styled.div`
  position: relative;
  width: 2px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Column = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:nth-child(2) {
    background-color: #fff;
    padding: 10px;
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

const InputWrapper = styled.div`
  position: relative;
  width: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  display: block;
  width: 600px;
  border: none;
  outline: none;
  padding: 10px;
  margin-top: 5px;
  font-size: 18px;
  color: #676767;
  border-bottom: solid 1px #dfdfdf;
  box-sizing: border-box;

  &:focus {
    border: solid 1px #999;
    border-radius: 3px;
  }
`;

const TextArea = styled.textarea`
  display: block;
  width: 600px;
  border: none;
  outline: none;
  padding: 10px;
  margin-top: 5px;
  font-size: 18px;
  color: #676767;
  border: solid 1px #dfdfdf;
  border-radius: 3px;
  box-sizing: border-box;

  &:focus {
    border: solid 1px #999;
    border-radius: 3px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 500;
  padding-left: 15px;
`;

const Button = styled.div`
  cursor: pointer;
  display: flex;
  width: 100px;
  height: 30px;
  background-color: #2146c7;
  border-radius: 15px;
  font-size: 15px;
  border: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: #ffffff;

  &:hover {
    background-color: #0d2d91; /* 마우스 오버 시 배경색 변경 */
  }
`;
