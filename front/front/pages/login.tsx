import React, { useEffect } from 'react';
import LoginForm from 'components/loginForm';
import { useSelector } from 'react-redux';
import { RootState } from 'slices';
import { useRouter } from 'next/router';

const LogIn = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LogIn;
