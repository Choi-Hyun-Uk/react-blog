import React from 'react';
import PostSearch from 'components/search/searchForm';
import Header from 'components/header';
import SearchPost from 'components/search/searchPost';
import { useSelector } from 'react-redux';
import { RootState } from 'slices';
import { SearchPostCardWrapper } from '../styles/styles';
import wrapper from 'store/configureStore';
import axios from 'axios';
import { loadUser } from 'actions/user';
import { GetServerSideProps } from 'next';

const Search = () => {
  const { searchPosts } = useSelector((state: RootState) => state.post);
  return (
    <>
      <Header />
      <PostSearch />
      <SearchPostCardWrapper>
        {searchPosts.length > 0 ? (
          <>
            {searchPosts?.map((post) => (
              <SearchPost post={post} key={post.id} />
            ))}
          </>
        ) : null}
      </SearchPostCardWrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log(context.store.getState());
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await context.store.dispatch(loadUser());
});

export default Search;
