import React, { useEffect, useRef } from 'react';
import wrapper from 'store/configureStore';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'slices';
import { throttle } from 'lodash';
import { GetServerSideProps } from 'next';

import HeaderForm from 'components/header';
import PostCard from 'components/postCard/postCard';
import WriteForm from 'components/writeForm';
import { loadUser } from 'actions/user';
import { postsLoad } from 'actions/post';

const Home = () => {
  const { loadPostsLoading, loadPostsMore } = useSelector((state: RootState) => state.post);
  const { posts } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  // 현재 로드된 포스트들의 마지막 포스트의 id값
  const lastId = posts[posts.length - 1]?.id;

  // 인피니트 스크롤링하기
  useEffect(() => {
    const infiniteScroll = throttle(() => {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        // loadPostMore true / loadPostsLoading false면 dispatch
        if (loadPostsMore && !loadPostsLoading) {
          dispatch(
            postsLoad({
              lastId,
            }),
          );
        }
      }
    }, 200);

    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [loadPostsMore, loadPostsLoading, lastId, dispatch]);

  return (
    <>
      <HeaderForm />
      <WriteForm />
      <PostCard />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await context.store.dispatch(loadUser());
  // 최초 여러 포스트 불러오기
  await context.store.dispatch(postsLoad({ lastId: 0 }));
});

export default Home;
