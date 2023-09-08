import type { NextPage } from "next";
import Head from "next/head";
import Header from "../../component/layout/header";
import Filter from "../../component/layout/filter";
import Navigation from "../../component/layout/navigation";
import KakaoMap from "../../component/KakaoMap";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SSUpot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Filter />
      <Navigation />

      <KakaoMap />
    </>
  );
};

export default Home;