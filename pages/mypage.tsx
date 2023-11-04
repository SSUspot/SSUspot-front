import { useState } from 'react';
import Header from '../component/layout/header';
import styled from 'styled-components';
import Modal from '../component/common/modal';
import Router from 'next/router';

const MyPage: React.FC = () => {
  // 팔로워, 팔로잉 숫자 클릭하면 각각에 맞게 리스트 보여주는 모달
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 팔로워 또는 팔로잉

  // 프로필 편집 모드 (nickname, statusMessage의 초기값은 DB에서 가져오는 값으로 초기화함)
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('이시현'); // 기존 nickname 값으로 초기화
  const [statusMessage, setStatusMessage] = useState('상태메시지입니다'); // 기존 statusMessage 값으로 초기화

  const clickModal = (type: string) => {
    setShowModal(!showModal);
    setModalType(type);
  };

  var posting: number = 4;
  var follower: number = 3;
  var following: number = 3;

  // 포스팅 개수에 따라 배열 생성
  const userPosts = Array.from({ length: posting }, (_, index) => ({
    id: index + 1,
  }));

  const handleEditClick = () => {
    // 프로필 편집 버튼을 클릭하면 프로필 편집 모드로 전환
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // "프로필 편집 완료" 버튼을 클릭하면 프로필 편집 모드 종료
    setIsEditing(false);
    // DB에 새로운 nickname과 statusMessage를 저장하는 것 구현
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');

    Router.push('/login');
  };
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
            {isEditing ? ( // 프로필 편집 모드인 경우 입력 필드 표시
              <ProfileEditInput
                type="text"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
            ) : (
              nickname // 편집 모드가 아닌 경우 기존 닉네임 표시
            )}
            {!isEditing && ( // 편집 모드가 아닌 경우에만 프로필 편집 버튼 표시
              <Button onClick={handleEditClick}>프로필 편집</Button>
            )}
            <Button onClick={handleLogout}>로그아웃</Button>
          </Content1>
          <Content2>
            <p>게시물 {posting}</p>
            <p
              onClick={() => clickModal('팔로워')}
              style={{ cursor: 'pointer' }}
            >
              팔로워 {follower}
            </p>
            {showModal && (
              <Modal clickModal={clickModal} modalType={modalType} />
            )}
            <p
              onClick={() => clickModal('팔로잉')}
              style={{ cursor: 'pointer' }}
            >
              팔로잉 {following}
            </p>
          </Content2>
          <Content2 style={{ fontWeight: 400 }}>
            {!isEditing ? (
              // 편집 모드가 아닌 경우 기존 상태 메시지 표시
              <p>{statusMessage}</p>
            ) : (
              // 편집 모드인 경우 상태 메시지 입력 필드 표시
              <ProfileEditInput
                type="text"
                value={statusMessage}
                onChange={(e) => setStatusMessage(e.target.value)}
              />
            )}
            {isEditing && ( // 편집 모드일 때 "프로필 편집 완료" 버튼 표시
              <Button onClick={handleSaveClick}>편집 완료</Button>
            )}
          </Content2>
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
  justify-content: center;
  align-items: flex-start;
`;

const Content1 = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
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
  display: inline-block;
  width: auto;
  padding: 10px 10px;
  border-radius: 5px;
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
  font-weight: 600;
  font-size: 14px;
  margin-left: 30px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
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
`;

const ProfileEditInput = styled.input`
  width: auto;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
  outline: none;
`;
