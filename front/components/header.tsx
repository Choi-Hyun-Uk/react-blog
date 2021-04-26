import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RiHome4Line, RiSearch2Line } from 'react-icons/ri';
import { CgMenu } from 'react-icons/cg';
import { RootState } from 'slices';
import { HeaderWrapper } from './styles';
import Modal from '../modal/menuModal';
import Link from 'next/link';
import PostSearch from './search/searchForm';

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const user = useSelector((state: RootState) => state.user.user);
  const [show, setShow] = useState(false);
  const [searchFormShow, setSearchFormShow] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(
    ({ target }) => {
      if (popRef.current && !popRef.current.contains(target)) {
        setShow(false);
      }
    },
    [setShow],
  );

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, []);

  const onClickToggleModal = useCallback(() => {
    setShow((prev) => !prev);
  }, [show]);

  const onClickhome = useCallback(() => {
    setShow(false);
  }, [show]);

  const onSearchFormShow = useCallback(() => {
    setSearchFormShow((prev) => !prev);
  }, [searchFormShow]);

  return (
    <>
      <HeaderWrapper>
        <div className="inner">
          <div className="menuBtn" ref={popRef}>
            {isLoggedIn && (
              <div className="menu-btn">
                <CgMenu onClick={onClickToggleModal} />
                <Modal show={show} />
              </div>
            )}
            <div onClick={onClickhome}>
              <Link href="/">
                <a>
                  <RiHome4Line />
                </a>
              </Link>
            </div>
            <div className="search-btn" onClick={onSearchFormShow}>
              <Link href="/search">
                <a>
                  <RiSearch2Line />
                </a>
              </Link>
            </div>
          </div>
          {isLoggedIn ? (
            <div>
              안녕하세요. <strong>{user?.nickname}</strong>님
            </div>
          ) : null}
        </div>
      </HeaderWrapper>
    </>
  );
};

export default Header;
