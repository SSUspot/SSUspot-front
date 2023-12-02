import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '../../component/layout/header';
import Filter from '../../component/layout/filter';
import Navigation from '../../component/layout/navigation';
import KakaoMap from '../../component/map/KakaoMap';

import spots from '../../component/spot/spots';

const MapMain: NextPage = () => {
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
