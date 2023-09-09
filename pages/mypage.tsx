import { useState } from "react";
import Header from "../component/layout/header";
import styled from "styled-components";
import Image from "next/image";
import Modal from "../component/common/modal";

const MyPage: React.FC = () => {
  // 팔로워, 팔로잉 숫자 클릭하면 각각에 맞게 리스트 보여주는 모달
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 팔로워 또는 팔로잉

  const clickModal = (type: string) => {
    setShowModal(!showModal);
    setModalType(type);
  };

  const name: string = "이시현";
  const posting: number = 4;
  const follower: number = 3;
  const following: number = 3;
  const state_message: string = "상태메시지입니다";

  // 포스팅 개수에 따라 배열 생성
  const userPosts = Array.from({ length: posting }, (_, index) => ({
    id: index + 1,
  }));

  return (
    <>
      <Header />
      <Container>
        <ImageBox>
          <StyledImage
            src="https://picsum.photos/150"
            alt=""
            width={150}
            height={150}
          ></StyledImage>
        </ImageBox>
        <ContentContainer>
          <Content1>
            {name} <Button>프로필 편집</Button>
          </Content1>
          <Content2>
            <p>게시물 {posting}</p>
            <p
              onClick={() => clickModal("팔로워")}
              style={{ cursor: "pointer" }}
            >
              팔로워 {follower}
            </p>
            {showModal && (
              <Modal
                clickModal={clickModal}
                modalType={modalType}
              />
            )}
            <p
              onClick={() => clickModal("팔로잉")}
              style={{ cursor: "pointer" }}
            >
              팔로잉 {following}
            </p>
          </Content2>
          <Content2 style={{ fontWeight: 400 }}>{state_message}</Content2>
        </ContentContainer>
      </Container>
      <PostingContainer>
        {userPosts.map((post) => (
          <Posting key={post.id}></Posting>
        ))}
      </PostingContainer>
    </>
  );
};

export default MyPage;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-contents: flex-start;
  padding: 50px 50px 60px;
  margin-left: 50px;
  width: 100vw;
  height: 150px;
  border-bottom: solid;
  border-color: rgba(0, 0, 0, 0.1);
`;

const ImageBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-contents: center;
  width: 250px;
  height: 300px;
`;

const StyledImage = styled.img`
  border-radius: 75px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Content1 = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-start;
  font-weight: 600;
  font-size: 20px;
`;

const Content2 = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
  font-weight: 600;
  margin-left: 50px;
`;

const PostingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 360px 360px 360px;
  margin: 10px 50px;
  gap: 10px;
`;

const Posting = styled.div`
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const ModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
padding: 10px 30px;
width: 300px;
height: 400px;
border-radius: 10px;
display: flex;
flex-direction: column;
background-color: #2f2f2f;
}`;
