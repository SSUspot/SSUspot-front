import Header from "../component/layout/header";
import styled from "styled-components";
import Image from "next/image";
import { BiSolidUserCircle } from "react-icons/bi";

const MyPage: React.FC = () => {
  const name: string = "이시현";
  const posting: number = 4;
  const follower: number = 3;
  const following: number = 3;
  const state_message: string = "상태메시지입니다";

  const userPosts = Array.from({ length: posting }, (_, index) => ({
    id: index + 1,
  }));

  return (
    <>
      <Header />
      <Container>
        <ImageBox>
          <BiSolidUserCircle
            size={150}
            color="#4f4c4c"
            opacity="80%"
          />
        </ImageBox>
        <ContentContainer>
          <Content1>
            {name} <Button>프로필 편집</Button>
          </Content1>
          <Content2>
            <p>게시물 {posting}</p>
            <p>팔로워 {follower}</p>
            <p>팔로잉 {following}</p>
          </Content2>
          <Content2 style={{ fontWeight: 400 }}>{state_message}</Content2>
        </ContentContainer>
      </Container>
      <PostingContainer>
        {userPosts.map((post) => (
          <Posting key={post.id}>
            <Image
              src="https://picsum.photos/440/360"
              alt={`Post ${post.id}`}
              width={440}
              height={360}
              unoptimized={true}
            ></Image>
          </Posting>
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
  font-size: 18px;
`;

const Content2 = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
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
  border-color: black;
  background-color: blue;
`;
