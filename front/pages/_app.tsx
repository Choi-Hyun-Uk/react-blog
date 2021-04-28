import React, { FC } from 'react';
import Head from 'next/head';
import '../styles.css';
import wrapper from '../store/configureStore';

const App: FC<any> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <link rel="icon" href="/favicon.ico"></link>
        <title>My Blog</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

// next 사이클에 redux 사이클 연결
export default wrapper.withRedux(App);
