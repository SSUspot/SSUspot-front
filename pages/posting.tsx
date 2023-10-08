import Header from "../component/layout/header";
import styled from "styled-components";
import ImageSlide from "../component/posting/image-slide";
const Posting: React.FC = () => {
  const nickname = "이시현";

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
            <Input type="text" placeholder="제목을 입력해주세요" required />
          </InputWrapper>
          <InputWrapper>
            <Label>내용</Label>
            <TextArea placeholder="내용을 입력해주세요" rows={4} />
          </InputWrapper>
          <InputWrapper>
            <Label>태그</Label>
            <Input type="text" placeholder="#바다 #노을" required />
          </InputWrapper>
          <InputWrapper>
            <Label>위치</Label>
            <Input type="text" placeholder="위치를 검색하세요" required />
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
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
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
  border: solid 1px rgba(0, 0, 0, 0.2);
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
    background-color: #0d2d91;
  }
`;
