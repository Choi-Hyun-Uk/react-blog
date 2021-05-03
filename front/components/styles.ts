import styled from '@emotion/styled';

// 로그인 전체 박스
export const LoginWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 3rem;

  background: white;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  & .user-icon {
    text-align: center;
    font-size: 1.8rem;
    color: #0ca678;
    margin-bottom: 40px;
  }
`;
// 로그인 input 폼
export const Form = styled.form`
  display: flex;
  flex-direction: column;

  & div {
    margin-bottom: 1.25rem;
  }

  & input {
    width: 100%;
    line-height: 46px;
    padding-left: 0.825rem;
    box-sizing: border-box;
    border-bottom: 2px solid #dee2e6;

    &:focus {
      border-bottom: 2px solid #0ca678;
    }
  }

  & button {
    cursor: pointer;
    margin-top: 1.25rem;
    line-height: 46px;
    font-size: 1rem;
    border-radius: 2px;
    background: #0ca678;
    color: white;
    &:hover {
      background: #087f5b;
    }
  }

  & a {
    text-align: center;
    margin-top: 0.625rem;
    line-height: 46px;
    font-size: 1rem;
    border-radius: 2px;
    border: 1px solid #fd7e14;
    box-sizing: border-box;
    color: #fd7e14;
    &:hover {
      color: white;
      background: #fd7e14;
    }
  }
`;

// 회원가입 전체
export const SignupWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 3rem;

  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 0 1.25rem rgba(0, 0, 0, 0.2);
`;
export const SignupBox = styled.form`
  display: flex;
  flex-direction: column;

  & div {
    margin-bottom: 1.25rem;
  }

  & input {
    width: 100%;
    line-height: 3rem;
    padding-left: 0.825rem;
    box-sizing: border-box;
    border-bottom: 2px solid #dee2e6;

    &:focus {
      border-bottom: 2px solid #0ca678;
    }
  }

  & button {
    cursor: pointer;
    margin-top: 1.25rem;
    line-height: 3rem;
    font-size: 1rem;
    border-radius: 2px;
    background: #0ca678;
    color: white;
    &:hover {
      background: #087f5b;
    }
  }
`;
// 비밀번호 에러
export const Error = styled.p`
  font-size: 0.625rem;
  color: #c92a2a;
  text-align: left;
  line-height: 1.5;
  word-break: keep-all;
`;

// Header Form
export const HeaderWrapper = styled.div`
  background: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);

  & .inner {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    height: 60px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  & .menuBtn {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    & svg {
      cursor: pointer;
      font-size: 1.25rem;
    }
    & .menu-btn {
      margin-left: 1rem;
    }
  }

  & .search-btn {
    margin-right: 1rem;
  }

  & strong {
    font-weight: bold;
    color: #0ca678;
  }
`;

// 글쓰기 폼
export const WriteWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  background: white;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 1rem;
  }

  & .login-box {
    padding: 1.25rem;
    text-align: center;
    & p {
      margin-bottom: 1.25rem;
    }
    & div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      & a {
        display: inline-block;
        margin: 0 0.625rem;
        color: #dee2e6;
        &:hover {
          color: #20c997;
        }
      }
    }
  }

  & .titlebox {
    margin-bottom: 1.25rem;
    & input {
      width: 100%;
      line-height: 2.5rem;
      padding-left: 1rem;
      padding-bottom: 10px;
      box-sizing: border-box;
      border-bottom: 2px solid #dee2e6;
      font-size: 1.25rem;
      font-weight: bold;

      &:focus {
        border-bottom: 2px solid #0ca678;
      }
    }
  }

  & .textbox {
    display: flex;
    margin-bottom: 1.25rem;
    & textarea {
      flex: 1;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      height: 100px;
      padding: 1.25rem;
      resize: none;
      outline: none;
      box-sizing: border-box;
      font-size: 1rem;

      &:focus {
        border: 2px solid #20c997;
      }
    }
  }

  & .form-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      background: transparent;
      border-radius: 2px;
      cursor: pointer;
    }
    & .file-btn {
      border: 1px solid #fd7e14;
      color: #fd7e14;
      margin-right: 1rem;
    }
    & .write-btn {
      color: #0ca678;
      border: 1px solid #0ca678;
    }
  }
`;

// 글쓰기 폼 이미지
export const ImgWrapper = styled.div`
  & ul {
    display: flex;
    flex-direction: row;
  }
  & li {
    width: 50px;
    height: 50px;
    margin-right: 5px;
    &:first-of-type {
      margin-right: 15px;
    }
    & img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

// 프로필 페이지 전체영역
export const ProfileWrapper = styled.div`
  position: relative;
  margin-top: 3rem;
  width: 100%;
  height: 100%;

  & .inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 860px;
    height: 100%;
    margin: 0 auto;
  }

  & .user-thumb {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: #dee2e6;
    margin-bottom: 4rem;
    overflow: hidden;
    & img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    & .profile-upload-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      border-radius: 50%;
      text-align: center;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      color: white;
      font-size: 1.25rem;
    }
  }
`;

export const ProfileFormBox = styled.div`
  padding-bottom: 100px;

  & div {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    &:first-of-type {
      margin-bottom: 3rem;
    }
  }

  & label {
    margin-right: 1.25rem;
    font-weight: bold;
  }

  & input {
    width: 300px;
    min-width: 100px;
    height: 40px;
    padding: 0 1.25rem;
    box-sizing: border-box;

    &:disabled {
      background: #e9ecef;
    }

    &:focus {
      border-bottom: 2px solid #20c997;
    }
  }

  & button {
    background: transparent;
  }

  & svg {
    font-size: 1.25rem;
    margin-left: 1.25rem;
    color: #adb5bd;
    cursor: pointer;
    &:hover {
      color: #20c997;
    }
  }

  @media screen and (max-width: 600px) {
    width: 100%;

    & div {
      flex-direction: column;
      padding: 0 1rem;
      height: auto;
    }

    & label {
      margin-right: 0;
      margin-bottom: 1rem;
    }

    & input {
      width: 100%;
      font-size: 1rem;
      text-align: center;
      min-width: 100px;
      height: 40px;
      padding: 0 1.25rem;
      box-sizing: border-box;

      &:disabled {
        background: #e9ecef;
      }

      &:focus {
        border-bottom: 2px solid #20c997;
      }
    }

    & button {
      position: absolute;
      right: 2rem;
    }

    & svg {
      position: absolute;
      right: 1rem;
    }
  }
`;
