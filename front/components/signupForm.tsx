import React, { useState, useCallback } from 'react';
import { SignupWrapper, Error, SignupBox } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from 'actions/user';
import { RootState } from 'slices';
import Router from 'next/router';

const SignupForm = () => {
  const sinupError = useSelector((state: RootState) => state.user.isSignupError);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();

  const onChangeNickname = useCallback(
    (e) => {
      setNickname(e.target.value);
    },
    [nickname],
  );

  const onChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email],
  );

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const onSignup = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        signup({
          nickname,
          email,
          password,
        }),
      );
      Router.replace('/');
    },
    [nickname, email, password],
  );

  return (
    <SignupWrapper>
      <SignupBox onSubmit={onSignup}>
        <div>
          <input type="text" value={nickname} onChange={onChangeNickname} placeholder="닉네임" />
        </div>
        <div>
          <input type="email" value={email} onChange={onChangeEmail} placeholder="이메일" />
        </div>
        <div>
          <input type="password" value={password} onChange={onChangePassword} placeholder="비밀번호" />
        </div>
        <div>
          <input type="password" value={passwordCheck} onChange={onChangePasswordCheck} placeholder="비밀번호확인" />
        </div>
        {passwordError && <Error>비밀번호가 동일하지 않습니다.</Error>}
        {sinupError && <Error>{sinupError}</Error>}
        <button type="submit">가입완료</button>
      </SignupBox>
    </SignupWrapper>
  );
};

export default SignupForm;
