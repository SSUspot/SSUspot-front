import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Header from '../../component/layout/header';
import Filter from '../../component/layout/filter';
import Navigation from '../../component/layout/navigation';
import ListContainer from '../../component/list/listContainer';

import Spot from '../../type/spot';
import spots from '../../component/spot/spots';

const ListPage: React.FC = () => {

  return (
    <>
      <Head>
        <title>SSUspot</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Header />
      <Filter />
      <Navigation />

      <ListContainer spots={spots} />
    </>
  );
};

export default ListPage;
