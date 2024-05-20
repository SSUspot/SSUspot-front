import styled from 'styled-components';
import LoginHeader from '../component/layout/loginHeader';
import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { PiUserCircleDuotone } from 'react-icons/pi';
import { accessTokenState } from '../states/state';

const LoginPage: React.FC = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      void router.push('/');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = 'http://localhost:8080/api/users/login';

      const response = await axios.post(apiUrl, {
        email: email,
        password: password,
      });
      setAccessToken({
        accessToken: response.data?.accessToken || null,
        accessTokenExpiredIn: response.data?.accessTokenExpiredIn || null,
        refreshToken: response.data?.refreshToken || null,
        refreshTokenExpiredIn: response.data?.refreshTokenExpiredIn || null,
      });
      localStorage.setItem('accessToken', response.data?.accessToken);
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMessage('가입되지 않은 사용자입니다. 계정을 생성해 주세요!');
      } else {
        console.error('에러:', error);
      }
    }
  };

  return (
    <>
      <LoginHeader />
      <br />
      <Container>
        <LoginContainer onSubmit={handleSubmit}>
          <P>LOGIN</P>
          <br />
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Input>

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Input>

          <Button type="submit" onClick={handleSubmit}>
            로그인
          </Button>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <LinkContainer>
            <span
              style={{ color: '#4f4c4c', fontWeight: 400, marginRight: 10 }}
            >
              아직 계정이 없다면?
            </span>
            <StyledLink href="/join">계정 만들기</StyledLink>
          </LinkContainer>
        </LoginContainer>
      </Container>
    </>
  );
};

export default LoginPage;

const P = styled.p`
  font-weight: 700;
  font-size: 2rem;
  color: #4f4f4f;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 80vh;
  padding: 4%;
  box-sizing: border-box;
`;

const LoginContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0 2rem 0;
  margin-top: 5rem;
  border-radius: 20px;
  width: 50%;
  height: 50%;
  background-color: rgba(217, 217, 217, 0.2);
  z-index: 1;

  @media (max-width: 768px) {
    width: 90%;
    height: 60%;
  }
`;

const Input = styled.input.attrs({ required: true })`
  width: 60%;
  height: 2rem;
  padding: 0.5rem;
  margin-bottom: 3%;
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
    margin-bottom: 5%;
  }
`;

const Button = styled.button`
  width: 60%;
  height: 2.5rem;
  margin: 2% 0;
  margin-bottom: 4%;
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

  @media (max-width: 768px) {
    margin: 2rem 0;
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

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;
