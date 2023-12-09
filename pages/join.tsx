import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import LoginHeader from '../component/layout/login-header';

import { useRouter } from 'next/router';

const JoinPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const defaultImageLink =
    'https://user-images.githubusercontent.com/17202261/101670093-195d9180-3a96-11eb-9bd4-9f31cbe44aea.png';
  const router = useRouter();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      void router.push('/');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // let uploadedImageUrl = '';
    // if (profileImageLink) {
    //   uploadedImageUrl = await uploadImage(profileImageLink); // 이미지 업로드 함수 호출
    // }

    try {
      const apiUrl = 'http://ssuspot.online/api/users/register';

      const response = await axios.post(apiUrl, {
        email: email,
        password: password,
        userName: userName,
        nickname: nickname,
        profileMessage: profileMessage,
        profileImageLink: defaultImageLink,
      });
      router.push('/login');
      console.log('회원가입 성공');
    } catch (error) {
      console.error('에러:', error);
    }
  };

  return (
    <>
      <LoginHeader />
      <br />
      <Container>
        <LoginContainer onSubmit={handleSubmit}>
          <P>JOIN</P>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>

          <Input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          ></Input>

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>

          <Input
            type="text"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></Input>

          <Input
            type="text"
            placeholder="status message"
            value={profileMessage}
            onChange={(e) => setProfileMessage(e.target.value)}
          ></Input>

          <Button type="submit" onClick={handleSubmit}>
            회원가입
          </Button>

          <LinkContainer>
            <span
              style={{ color: '#4f4c4c', fontWeight: 400, marginRight: 10 }}
            >
              계정이 있다면
            </span>
            <StyledLink href="/login">로그인</StyledLink>
          </LinkContainer>
        </LoginContainer>
      </Container>
    </>
  );
};

export default JoinPage;

const P = styled.p`
  font-weight: 700;
  font-size: 2rem;
  color: #4f4f4f);
  margin-bottom: 4%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 80vh;
  padding: 2%;
`;

const LoginContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0 2rem 0;
  margin-top: 1rem;
  border-radius: 20px;
  width: 60%;
  background-color: rgba(217, 217, 217, 0.2);
  z-index: 1;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Input = styled.input.attrs({ required: true })`
  width: 60%;
  height: 2rem;
  padding: 0.5rem;
  margin-bottom: 2%;
  border: none;
  border-radius: 5px;
  background-color: rgba(217, 217, 217, 0.5);
  font-size: 1rem;
  color: #4f4c4c;
  cursor: pointer;

  &:focus {
    border-color: #007bff; // Highlight color on focus
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    outline: none;
  }

  @media (max-width: 768px) {
    width: 70%;
    margin-bottom: 3%;
  }
`;

const Button = styled.button`
  width: 60%;
  height: 2.5rem;
  margin: 2% 0;
  padding: 0.5rem;
  border: none;
  background-color: rgba(48, 55, 205, 0.7);
  border-radius: 5px;
  font-size: 1rem;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgba(48, 55, 205, 0.8);
  }
`;

const LinkContainer = styled.div`
  display: inline;
`;

const StyledLink = styled(Link)`
  color: rgba(48, 55, 205, 0.7);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
