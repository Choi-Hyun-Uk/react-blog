import React from 'react';
import SignupForm from 'components/signupForm';
import wrapper from 'store/configureStore';
import { loadUser } from 'actions/user';
import axios from 'axios';
import { GetServerSideProps } from 'next';

const Signup = () => {
  return <SignupForm />;
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await context.store.dispatch(loadUser());
});

export default Signup;
