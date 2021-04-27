import React, { useEffect } from 'react';
import LoginForm from 'components/loginForm';
import { useSelector } from 'react-redux';
import { RootState } from 'slices';
import { useRouter } from 'next/router';

const LogIn = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user && user?.id) {
      router.push('/', null, { shallow: true });
    }
  }, [user]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LogIn;
