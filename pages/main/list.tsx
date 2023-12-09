import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Header from '../../component/layout/header';
import Filter from '../../component/layout/filter';
import Navigation from '../../component/layout/navigation';
import ListContainer from '../../component/list/listContainer';
import axiosInstance from '../../utils/axiosInstance';

import Spot from '../../type/spot';

const ListPage: React.FC = () => {
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
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />
      <Filter />
      <Navigation />

      <ListContainer spots={spots} />
    </>
  );
};

export default ListPage;
