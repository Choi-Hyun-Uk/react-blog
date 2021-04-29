import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'slices';
import { MyBlogWrapper } from '../../styles/styles';
import { loadUser } from 'actions/user';
import { myPostLoad } from 'actions/post';
import wrapper from 'store/configureStore';
import axios from 'axios';
import { throttle } from 'lodash';
import { useRouter } from 'next/router';

import Header from 'components/header';
import MyPostCard from 'components/myPostCard';

const MyPost = () => {
  const router = useRouter();
  const { pagename } = router.query;
  const post = useSelector((state: RootState) => state.post.myPosts);
  const { loadMyPostsMore, loadMyPostsLoading } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  console.log(pagename);

  // 현재 로드된 포스트들의 마지막 포스트의 id값
  const lastId = post[post.length - 1]?.id;

  // 인피니트 스크롤링하기
  useEffect(() => {
    const infiniteScroll = throttle(() => {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        // loadMyPostsMore true / loadMyPostsLoading false면 dispatch
        if (loadMyPostsMore && !loadMyPostsLoading) {
          dispatch(
            myPostLoad({
              nickname: pagename.toString(),
              lastId,
            }),
          );
        }
      }
    }, 200);

    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [loadMyPostsMore, loadMyPostsLoading, lastId, dispatch]);

  return (
    <>
      <Header />
      <MyBlogWrapper>
        <div className="inner">
          {post ? (
            <>
              {post.map((item) => (
                <MyPostCard key={item.id} post={item} />
              ))}
            </>
          ) : null}
        </div>
      </MyBlogWrapper>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  console.log('pagename', context.params.pagename);

  await context.store.dispatch(loadUser());
  await context.store.dispatch(
    myPostLoad({
      nickname: context.params.pagename.toString(),
    }),
  );
});

export default MyPost;
