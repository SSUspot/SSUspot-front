import type { NextPage } from "next";
import Head from "next/head";
import Header from "../component/layout/header";
import Filter from "../component/layout/filter";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SSUpot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Filter />
      <br/>
      <p> index.tsx </p>

    </>
  );
};

export default Home;

