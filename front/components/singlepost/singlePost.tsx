import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postLike, postUnLike } from 'actions/post';

import LoginModal from 'modal/loginModal';
import Comments from 'components/comment/comments';
import CommentForm from 'components/comment/commentForm';
import SinglePostContent from 'components/singlepost/singlePostContent';
import { RootState } from 'slices';
import { SinglePostWrapper } from './styles';

const SinglePost = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const post = useSelector((state: RootState) => state.post.singlePost);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const dispatch = useDispatch();

  const onClickLike = useCallback(() => {
    if (!isLoggedIn) {
      return setLoginModalShow(true);
    }
    dispatch(
      postLike({
        postId: Number(post.id),
      }),
    );
  }, [post]);

  const onClickUnLike = useCallback(() => {
    dispatch(
      postUnLike({
        postId: Number(post.id),
      }),
    );
  }, [post]);

  return (
    <SinglePostWrapper>
      {post ? (
        <div className="inner">
          <LoginModal show={loginModalShow} />
          <SinglePostContent onClickLike={onClickLike} onClickUnLike={onClickUnLike} />
          <div className="comment-wrapper">
            <h1>댓글 ({post.Comments.length})</h1>
            <CommentForm postId={post.id} />
            {post.Comments ? (
              <ul>
                {post.Comments.map((item) => (
                  <Comments key={item.id} item={item} />
                ))}
              </ul>
            ) : (
              <div>댓글이 없습니다.</div>
            )}
          </div>
        </div>
      ) : null}
    </SinglePostWrapper>
  );
};

export default SinglePost;
