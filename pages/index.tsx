import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  const handlerButton = () => {
    router.push('/main/list');
  };

  return (
    <>
      <Head>
        <title>SSUspot</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <PageContainer>
        <Quote>“사진을 찍기 위한 최적의 장소를 찾아보세요!”</Quote>
        <Source> - SSUSPOT - </Source>
        <Button onClick={handlerButton}> Go SSUSPOT </Button>
      </PageContainer>
    </>
  );
};

export default Home;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0000ff;
`;

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0055ff;
  color: white;
  font-family: 'GmarketSansBold';
`;

const Quote = styled.blockquote`
  font-size: 3vw;
  text-align: center;
`;

const Source = styled.cite`
  font-size: 2vh;
  margin-top: 2vh;
`;

const Button = styled.button`
  transition: 0.5s ease-in-out;
  transform-origin: center;
  background-color: #ff0000;
  color: #fff;
  cursor: pointer;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 20px;

  &:hover {
    transform: translateY(-1px) scale(1.1);
    background-color: #cc0000;
  }
`;

const DownloadButton = styled.a`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: red;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 5px;
  box-shadow: 0 4px 2px -2px gray;
  transition: background-color 0.3s ease; /* 호버 효과를 위한 전환 */

  &:hover {
    transform: scale(1.01);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12);
  }
`;
