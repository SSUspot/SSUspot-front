import type { NextPage } from "next";
import Head from "next/head";
import Header from "../component/layout/header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SSUpot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <br/>
      <p> index.tsx </p>

    </>
  );
};

export default Home;

