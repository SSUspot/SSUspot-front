import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import LoginHeader from "../component/layout/login-header";
import { PiUserCirclePlusDuotone } from "react-icons/pi";

const JoinPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <LoginHeader />
      <br />
      <Container>
        <PiUserCirclePlusDuotone
          size="90px"
          color="#696FFD"
        />
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

          <Button type="submit">회원가입</Button>
          <LinkContainer>
            <span
              style={{ color: "#4f4c4c", fontWeight: 400, marginRight: 10 }}
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

const Input = styled.input.attrs({ required: true })`
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

const LinkContainer = styled.div`
  display: inline;
`;

const StyledLink = styled(Link)`
  color: rgba(48, 55, 205, 0.7);
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
`;
