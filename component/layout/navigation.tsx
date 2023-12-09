import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Home from '../../public/navigation/home.png';
import Map from '../../public/navigation/map.png';
import List from '../../public/navigation/list.png';
import Group from '../../public/navigation/group.png';
import Like from '../../public/navigation/like.png';
import Post from '../../public/navigation/post.png';
import Setting from '../../public/navigation/setting.png';
import Mypage from '../../public/navigation/mypage.png';

const Navigation: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isList, setIsList] = useState(false);
  const [ismap, setIsMap] = useState(true);
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const currentURL = window.location.href;
    if (currentURL.includes('/main/map')) {
      setIsMap(false);
      setIsList(true);
    } else if (currentURL.includes('/main/list')) {
      setIsMap(true);
      setIsList(false);
    }
  }, []);

  const handleRoute = (route: string) => {
    router.push(route);
  };

  return (
    <>
      <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <NavigationBox className={isHovered ? 'hovered' : ''}>
          <ItemButton onClick={() => handleRoute('/main/list')}>
            <Image src={Home} alt='Home' width={25} height={25} />
            <p> 홈 </p>
          </ItemButton>
          {ismap && (
            <ItemButton onClick={() => handleRoute('/main/map')}>
              <Image src={Map} alt='Map' width={25} height={25} />
              <p> 지도 보기 </p>
            </ItemButton>
          )}
          {isList && (
            <ItemButton onClick={() => handleRoute('/main/list')}>
              <Image src={List} alt='List' width={25} height={25} />
              <p> 리스트 보기 </p>
            </ItemButton>
          )}
          <ItemButton>
            <Image src={Group} alt='Group' width={25} height={25} />
            <p> 팔로잉 피드 </p>
          </ItemButton>
          <ItemButton>
            <Image src={Like} alt='Like' width={25} height={25} />
            <p> 좋아요한 스팟 </p>
          </ItemButton>
          <ItemButton>
            <Image src={Post} alt='Post' width={25} height={25} />
            <p> 글 작성 </p>
          </ItemButton>
          <ItemButton>
            <Image src={Setting} alt='Setting' width={25} height={25} />
            <p> 설정 </p>
          </ItemButton>
          <ItemButton onClick={() => handleRoute('/mypage')}>
            <Image src={Mypage} alt='Mypage' width={25} height={25} />
            <p> 마이페이지 </p>
          </ItemButton>
        </NavigationBox>
      </Container>
    </>
  );
};

export default Navigation;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100px;
  top: calc(100% - 100px);
  z-index: 99;
`;

const NavigationBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 60px;
  background: #2f2f2f;
  border-radius: 100px;
  opacity: 0;
  transition: opacity 0.5s ease;

  &.hovered {
    opacity: 1;
  }
`;

const ItemButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% / 7);
  height: 40px;
  border: none;
  font-size: 12px;
  color: #f3f3f3;
  background: none;
  position: relative;

  &:hover::before {
    content: '';
    position: absolute;
    top: -10px;
    height: 2px;
    width: 30%;
    background-color: #f3f3f399;
  }
  &:hover::after {
    content: '';
    position: absolute;
    bottom: -10px;
    height: 2px;
    width: 30%;
    background-color: #f3f3f399;
  }
`;
