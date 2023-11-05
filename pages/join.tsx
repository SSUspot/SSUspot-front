import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import LoginHeader from '../component/layout/login-header';
import { PiUserCirclePlusDuotone } from 'react-icons/pi';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userState } from '../states/state';

const JoinPage: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileImageLink, setProfileImageLink] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      void router.push('http://localhost:3000/');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // const apiUrl = "http://172.104.113.48:8080/api/user/register";
      const apiUrl = 'http://localhost:8080/api/users/register';

      const response = await axios.post(apiUrl, {
        email: email,
        password: password,
        userName: userName,
        nickname: nickname,
        profileMessage: profileMessage,
        profileImageLink: profileImageLink,
      });

      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      router.push('http://localhost:3000/login');
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
        <PiUserCirclePlusDuotone size="90px" color="#696FFD" />
        <LoginContainer onSubmit={handleSubmit}>
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

          <Input
            type="file"
            placeholder="Profile Image"
            accept="image/png, image/jpeg"
            value={profileImageLink}
            onChange={(e) => setProfileImageLink(e.target.value)}
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

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
`;

const LoginContainer = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 50px;
  border-radius: 20px;
  top: 50%;
  width: 550px;
  height: 650px;
  background-color: rgba(217, 217, 217, 0.2);
  z-index: -1;
`;

const Input = styled.input.attrs({ required: true })`
  width: 400px;
  height: 30px;
  padding: 10px 0 10px 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: rgba(217, 217, 217, 0.5);
  font-family: 'serif';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #4f4c4c;
  cursor: pointer;
`;

const Button = styled.button`
  width: 410px;
  height: 30x;
  margin: 40px 0 20px 0;
  padding: 10px;
  border: none;
  background-color: rgba(48, 55, 205, 0.7);
  border-radius: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: white;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  display: inline;
`;

const StyledLink = styled(Link)`
  color: rgba(48, 55, 205, 0.7);
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
`;
