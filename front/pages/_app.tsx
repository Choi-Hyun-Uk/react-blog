import React, { FC } from 'react';
import Head from 'next/head';
import '../styles.css';
import wrapper from '../store/configureStore';
import { useSelector } from 'react-redux';
import { RootState } from 'slices';

const App: FC<any> = ({ Component, pageProps }) => {
  const { singlePost } = useSelector((state: RootState) => state.post);

  // 정규표현식 - url 타이틀 특수문자 및 공백 '-'변환 후 마지막 '-'은 제거
  const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;
  const regex2 = singlePost.title.replace(regex, '-');
  const title = regex2.replace(/-$/, '');

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta name="description" content={singlePost?.content} />
        <meta property="og:title" content={`${singlePost?.User.nickname}님의 게시글`} />
        <meta
          property="og:description"
          content={singlePost?.Images[0] ? singlePost.Images[0].src : 'http://chudevlog.com/favicon.ico'}
        />
        <meta property="og:url" content={`http://chudevlog.com/${singlePost?.User.nickname}/${singlePost && title}`} />
        <link rel="icon" href="/favicon.ico"></link>
        <title>My Blog</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

// next 사이클에 redux 사이클 연결
export default wrapper.withRedux(App);
