import React from 'react';
import { ModalWrapper, LoginModalBox } from './styles';
import Link from 'next/link';

const LoginModal = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <ModalWrapper>
      {show && (
        <LoginModalBox>
          <h1>로그인</h1>
          <p>로그인 후 이용 가능합니다.</p>
          <div>
            <Link href="/login">
              <a className="login-btn">로그인</a>
            </Link>
            <Link href="/signup">
              <a className="signup-btn">회원가입</a>
            </Link>
          </div>
        </LoginModalBox>
      )}
    </ModalWrapper>
  );
};

export default LoginModal;
