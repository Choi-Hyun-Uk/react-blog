import React, { useCallback } from 'react';
import { MenuBox } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'actions/user';
import { RootState } from 'slices';
import Link from 'next/link';

const Modal = ({ show }) => {
  const id = useSelector((state: RootState) => state.user.user?.id);
  const nickname = useSelector((state: RootState) => state.user.user?.nickname);
  const dispatch = useDispatch();

  const onClickLogout = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  // show가 false면 화면에 메뉴를 나타내지 않는다.
  if (!show) {
    return null;
  }

  // show가 true면 아래 메뉴가 화면에 나타난다.
  return (
    <MenuBox>
      <li className="myBlog">
        <Link
          href={{
            pathname: '/[pagename]/',
            // query: { name: `${id}`, type: 'myBlog' },
          }}
          as={`/${nickname}`}
        >
          <a>
            <div>내 블로그</div>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/profile">
          <a>
            <div>내 프로필</div>
          </a>
        </Link>
      </li>
      <li onClick={onClickLogout}>
        <div>로그아웃</div>
      </li>
    </MenuBox>
  );
};

export default Modal;
