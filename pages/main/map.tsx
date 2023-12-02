import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '../../component/layout/header';
import Filter from '../../component/layout/filter';
import Navigation from '../../component/layout/navigation';
import KakaoMap from '../../component/map/KakaoMap';

const MapMain: NextPage = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    if (spots.length === 0) {
      handleGetSopts();
    }
    console.log(spots);
  });

  const handleGetSopts = async () => {
    try {
      const apiUrl = 'http://ssuspot.online/api/spots';
      const response = await axios.get(apiUrl);
      console.log(response);
      setSpots(response.data);
    } catch (error) {
      console.error('에러:', error);
    }
  };

  return (
    <>
      <Head>
        <title>SSUspot</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Header />
      <Filter />
      <Navigation />

      <KakaoMap spots={spots} />
    </>
  );
};

export default MapMain;
