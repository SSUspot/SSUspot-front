import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import Post from '../../type/post';

const HeaderContainer: React.FC<{ postInfo: Post }> = ({ postInfo }) => {
  return (
    <>
      <UserProfile>
        <ProfileImage src={postInfo.user.profileImageLink} alt='Profile Image' />
        <div>{postInfo.user.nickname}</div>
      </UserProfile>
      <DivisionBar />
    </>
  );
};

export default HeaderContainer;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'GmarketSansBold';
  font-size: 2vh;
  margin-bottom: 2vh;

  img {
    width: 5vh;
    height: 5vh;
    border-radius: 50%;
    margin-right: 1vh;
  }
`;

const ProfileImage = styled.img`
  width: 15%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;

  @media (max-width: 735px) {
    width: 20%;
  }
`;

const DivisionBar = styled.div`
  width: 100%;
  border: 0.5px solid rgba(79, 76, 76, 0.4);
  margin-bottom: 2vh;

  @media (max-width: 735px) {
    margin-bottom: 2vh;
  }
`;
