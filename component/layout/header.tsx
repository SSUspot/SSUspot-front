import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logo from '../../public/logo.png';
import bell from '../../public/bell.png';
import search from '../../public/search.png';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();

  const handleMain = () => {
    router.push('/');
  };

  return (
    <>
      <Container>
        <Items>
          <Logo onClick={handleMain}>
            <Image src={logo} alt='Logo' width={120} height={22} />
          </Logo>
          <InputContainer>
            <Image src={search} alt='Search' width={22} height={22} />
            <InputBox type='text' placeholder='사진 스팟을 검색하세요' />
          </InputContainer>
          <Bell>
            <Image src={bell} alt='Bell' width={16} height={18} />
          </Bell>
        </Items>
      </Container>
    </>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
  background: #ffffff;
  z-index: 1;

  &::after {
    content: '';
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
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 35px;
  border: 1px solid #4f4c4c;
  padding: 0 10px;
  margin: 0;
  border-radius: 40px;
`;

const InputBox = styled.input`
  width: 90%;
  height: 20px;
  font-size: 12px;
  border: none;
`;

const Bell = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 35px;
  border: 1px solid #4f4c4c;
  padding: 0;
  margin: 0;
  border-radius: 20px;
`;
