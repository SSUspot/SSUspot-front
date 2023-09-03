import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import LoginHeader from "../component/layout/login-header";
import { FaUserCircle } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <LoginHeader />
      <br />
      <Container>
        <FaUserCircle
          size="80px"
          color="#696FFD"
        />
        <LoginContainer onSubmit={handleSubmit}>
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
          <Button type="submit">로그인</Button>
          <StyledLink href="/join">계정 만들기</StyledLink>
        </LoginContainer>
      </Container>
    </>
  );
};

export default LoginPage;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
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
  height: 450px;
  background-color: rgba(217, 217, 217, 0.2);
  z-index: -1;
`;

const Input = styled.input`
  width: 400px;
  height: 30px;
  padding: 10px 0 10px 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: rgba(217, 217, 217, 0.5);
  font-family: "serif";
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

const StyledLink = styled(Link)`
  color: rgba(48, 55, 205, 0.7);
  text-decoration: none;
  font-size: 16px;
`;
