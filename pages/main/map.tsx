import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '../../component/layout/header';
import Filter from '../../component/layout/filter';
import Navigation from '../../component/layout/navigation';
import KakaoMap from '../../component/KakaoMap';

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
      const apiUrl = 'http://localhost:8080/api/spots';
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
        <title>SSUpot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Filter />
      <Navigation />

      <KakaoMap spots={spots} />
    </>
  );
};

export default MapMain;
