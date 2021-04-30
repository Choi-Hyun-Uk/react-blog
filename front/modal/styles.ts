import styled from '@emotion/styled';

// 메뉴 모달 박스
export const MenuBox = styled.ul`
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  z-index: 99999999999;

  & li {
    cursor: pointer;
    &:hover {
      background: #0ca678;
      color: white;
    }
    & div {
      width: 120px;
      padding: 16px;
    }
    &:hover div {
      color: white;
    }
  }
`;

// 모달 부모 박스
export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 60px 100px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 99999999999;
`;

// 게시글 삭제 모달 자식
export const DeleteModalBox = styled.div`
  & h1 {
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
  }

  & p {
    font-size: 16px;
    margin-bottom: 40px;
  }

  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & button {
      cursor: pointer;
      background: white;
      padding: 8px 16px;
    }

    & .cancle-btn {
      border: 1px solid #495057;
      border-radius: 4px;
      &:hover {
        background: #495057;
        color: white;
      }
    }

    & .delete-btn {
      border: 1px solid #f03e3e;
      border-radius: 4px;
      color: #f03e3e;
      &:hover {
        background: #f03e3e;
        color: white;
      }
    }
  }
`;

// 로그인 모달 자식
export const LoginModalBox = styled.div`
  text-align: center;
  z-index: 99999999999;

  & h1 {
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
  }

  & p {
    font-size: 16px;
    margin-bottom: 40px;
  }

  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 250px;

    & a {
      cursor: pointer;
      width: 100px;
      line-height: 40px;
    }

    & .login-btn {
      border: 1px solid #20c997;
      border-radius: 4px;
      color: #20c997;
    }

    & .signup-btn {
      background: #20c997;
      border-radius: 4px;
      color: white;
      &:hover {
        background: #0ca678;
      }
    }
  }
`;
