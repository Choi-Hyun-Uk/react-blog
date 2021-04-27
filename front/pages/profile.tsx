import React from 'react';
import Header from 'components/header';
import wrapper from 'store/configureStore';
import axios from 'axios';
import { loadUser } from 'actions/user';
import UserProfile from 'components/userProfile';
import { GetServerSideProps } from 'next';

const Profile = () => {
  return (
    <>
      <Header />
      <UserProfile />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log(context.store.getState());
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await context.store.dispatch(loadUser());
});

export default Profile;
