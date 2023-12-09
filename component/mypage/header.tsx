import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Router from 'next/router';
import axiosInstance from '../../utils/axiosInstance';

import User from '../../type/user';
import FollowUser from '../../type/followUser';

const MyPageHeader: React.FC<{ userInfo: User; postLength: number }> = ({
  userInfo,
  postLength,
}) => {
  const [following, setFollowing] = useState<FollowUser[]>([]);
  const [follower, setFollower] = useState<FollowUser[]>([]);

  const Tempimage = 'https://ssuspot.s3.ap-northeast-2.amazonaws.com/1702019010298_IMG_9672.JPG';

  useEffect(() => {
    // following
    axiosInstance
      .get('/api/users/following')
      .then((response) => {
        console.log('/api/users/following', response.data);
        setFollowing(response.data);
      })
      .catch((error) => {
        console.log('/api/users/following error', error);
      });

    // follower
    axiosInstance
      .get('/api/users/follower')
      .then((response) => {
        console.log('/api/users/follower', response.data);
        setFollower(response.data);
      })
      .catch((error) => {
        console.log('/api/users/follower error', error);
      });
  }, []);

  if (!userInfo) {
    return <Container> roading... </Container>;
  }

  return (
    <Container>
      <ProfileContainer>
        <ProfileImage
          src={userInfo.profileImageLink}
          alt='Profile Image'
          width={300}
          height={300}
        />
        <ProfileInfo>
          <Nickname>{userInfo.nickname}</Nickname>
          <Email>{userInfo.email}</Email>
          <ProfileMessage>{userInfo.profileMessage}</ProfileMessage>
        </ProfileInfo>
      </ProfileContainer>
      <FollowContainer>
        <Content> 게시물 : {postLength} </Content>
        <Content> 팔로워 : {follower.length} </Content>
        <Content> 팔로잉 : {following.length} </Content>
      </FollowContainer>
    </Container>
  );
};

export default MyPageHeader;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5vh;
  box-sizing: border-box;

  @media (max-width: 735px) {
    padding: 4vh 2vh 2vh 0;
    flex-direction: column;
    gap: 2vh;
  }
`;

const ProfileContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 735px) {
    width: 80%;
  }
`;

const ProfileImage = styled(Image)`
  width: 15vh;
  height: 15vh;
  border-radius: 50%;
  margin-right: 7vh;

  @media (max-width: 735px) {
    width: 10vh;
    height: 10vh;
    margin-right: 5vh;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.div`
  font-family: 'GmarketSansBold';
  font-size: 3vh;
  margin-bottom: 0.5vh;

  @media (max-width: 735px) {
    font-size: 2.5vh;
  }
`;

const Email = styled.div`
  font-family: 'GmarketSansMedium';
  font-size: 2vh;
  margin-bottom: 3vh;

  @media (max-width: 735px) {
    font-size: 1.5vh;
    margin-bottom: 1.5vh;
  }
`;

const ProfileMessage = styled.div`
  font-family: 'GmarketSansMedium';
  font-size: 2vh;

  @media (max-width: 735px) {
    font-size: 1.5vh;
  }
`;

const FollowContainer = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 735px) {
    width: 80%;
  }
`;

const Content = styled.div`
  font-family: 'GmarketSansBold';
  font-size: 2vh;
  padding: 2vh;

  @media (max-width: 735px) {
    font-size: 1.5vh;
    padding: 1vh;
  }
`;
