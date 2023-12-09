import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import filterAlt from '../../public/filter_alt.png';

const Filter: React.FC = () => {
  return (
    <>
      <Container>
        <ItemButton> 부산 </ItemButton>
        <ItemButton> 대구 </ItemButton>
        <ItemButton> 제주 </ItemButton>
        <ItemButton> 경주 </ItemButton>
        <ItemButton className='mobile-hidden'> 목포 </ItemButton>
        <ItemButton className='mobile-hidden'> 여수 </ItemButton>
        <FilterButton>
          <Image src={filterAlt} alt='filter' width={22} height={22} />
        </FilterButton>
      </Container>
    </>
  );
};

export default Filter;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 55px;
  font-size: 2vw;
  position: sticky;
  top: 80px;
  background: #ffffff;
  z-index: 5;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #4f4c4c33;
  }

  @media (max-width: 735px) {
    height: 40px;
    .mobile-hidden {
      display: none;
    }
  }
`;

const ItemButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  background-color: #ffffff;
  font-family: 'GmarketSansMedium';

  &:hover {
    font-weight: bold;
    color: #4f4c4c;
  }

  @media (max-width: 735px) {
    width: 50px;
  }
`;

const FilterButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border: 1px solid #4f4c4c;
  padding: 0;
  margin: 0;
  border-radius: 20px;

  @media (max-width: 735px) {
    width: 50px;
    height: 25px;
  }
`;
