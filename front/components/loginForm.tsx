import React, { useState, useCallback } from 'react';
import { CgUserlane } from 'react-icons/cg';
import Link from 'next/link';
import { LoginWrapper, Form, Error } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from 'actions/user';
import { RootState } from 'slices';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoginError } = useSelector((state: RootState) => state.user);

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onLogin = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        logIn({
          email,
          password,
        }),
      );
    },
    [email, password],
  );

  return (
    <LoginWrapper>
      <div className="user-icon">
        <CgUserlane />
      </div>
      <Form onSubmit={onLogin}>
        <div>
          {/* <label htmlFor="user-email">이메일</label> */}
          <input type="email" value={email} onChange={onChangeEmail} placeholder="이메일" />
        </div>
        <div>
          {/* <label htmlFor="user-password">비밀번호</label> */}
          <input
            id="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호"
          />
        </div>
        {isLoginError && <Error>{isLoginError}</Error>}
        <button type="submit">로그인</button>
        <Link href="/signup">회원가입</Link>
      </Form>
    </LoginWrapper>
  );
};

export default LoginForm;
