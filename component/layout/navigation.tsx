import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Home from "../../public/navigation/home.png";
import Map from "../../public/navigation/map.png";
import Group from "../../public/navigation/group.png";
import Like from "../../public/navigation/like.png";
import Post from "../../public/navigation/post.png";
import Chat from "../../public/navigation/chat.png";
import Mypage from "../../public/navigation/mypage.png";

const Navigation: React.FC = () => {
  return (
    <>
      <Container>
        <NavigationBox>
          <ItemButton>
            <Image src={Home} alt="Home" width={25} height={25} />
            <p> 홈 </p>
          </ItemButton>
          <ItemButton>
            <Image src={Map} alt="Map" width={25} height={25} />
            <p> 지도 보기 </p>
          </ItemButton>
          <ItemButton>
            <Image src={Group} alt="Group" width={25} height={25} />
            <p> 팔로잉 피드 </p>
          </ItemButton>
          <ItemButton>
            <Image src={Like} alt="Like" width={25} height={25} />
            <p> 좋아요한 스팟 </p>
          </ItemButton>
          <ItemButton>
            <Image src={Post} alt="Post" width={25} height={25} />
            <p> 글 작성 </p>
          </ItemButton>
          <ItemButton>
            <Image src={Chat} alt="Chat" width={25} height={25} />
            <p> 채팅 </p>
          </ItemButton>
          <ItemButton>
            <Image src={Mypage} alt="Mypage" width={25} height={25} />
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
  position: absolute;
  width: 100%;
  height: 100px;
  top: calc(100% - 100px);
`;

const NavigationBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 60px;
  background: #f3f3f3;
  border-radius: 100px;
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
  color: #4f4c4c;
  background: none;
  position: relative;

  &:hover::before {
    content: "";
    position: absolute;
    top: -10px;
    height: 2px;
    width: 30%;
    background-color: #4f4c4c33;
  }
  &:hover::after {
    content: "";
    position: absolute;
    bottom: -10px;
    height: 2px;
    width: 30%;
    background-color: #4f4c4c33;
  }
`;
