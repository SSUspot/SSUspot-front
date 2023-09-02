import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";

const LoginHeader: React.FC = () => {
  return (
    <>
      <Container>
        <Items>
          <Logo>
            <Image
              src={logo}
              alt="Logo"
              width={120}
              height={22}
            />
          </Logo>
          <LinkContainer>
            <Link
              href="/login"
              style={{
                fontFamily: "sans-serif",
                textDecoration: "none",
                color: "#000000",
                cursor: "pointer",
              }}
              passHref
            >
              Login
            </Link>
            <Link
              href="/join"
              style={{
                fontFamily: "sans-serif",
                textDecoration: "none",
                color: "#000000",
                cursor: "pointer",
              }}
              passHref
            >
              Join
            </Link>
          </LinkContainer>
        </Items>
      </Container>
    </>
  );
};

export default LoginHeader;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #4f4c4c33;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 70%;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 35px;
  padding: 0;
  margin: 0;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  width: 150px;
  height: 100px;
  padding: 0px;
  margin: 0;
  gap: 20px;
`;
