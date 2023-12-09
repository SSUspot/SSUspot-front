import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '../../component/layout/header';
import Filter from '../../component/layout/filter';
import Navigation from '../../component/layout/navigation';
import KakaoMap from '../../component/map/KakaoMap';
import axiosInstance from '../../utils/axiosInstance';

import Spot from '../../type/spot';

import axiosInstance from '../../utils/axiosInstance';

import Spot from '../../type/spot';

const MapMain: NextPage = () => {
  const [spots, setSopts] = useState<Spot[]>([]);

  useEffect(() => {
    axiosInstance
      .get('/api/spots')
      .then((response) => {
        console.log('/api/spots', response.data);
        setSopts(response.data);
      })
      .catch((error) => {
        console.log('/api/spots error', error);
      });
  }, []);

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
