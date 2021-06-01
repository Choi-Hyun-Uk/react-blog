import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addComment } from '../../actions/post';
import { CommentFormBox } from './styles';
import { RootState } from 'slices';
import LoginModal from 'modal/loginModal';

const CommentForm = ({ postId }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const onCloseLoginModal = useCallback(() => {
    setLoginModalShow(false);
  }, [loginModalShow]);

  const onChangeComment = useCallback(
    (e) => {
      setContent(e.target.value);
    },
    [content],
  );

  const onSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      if (!isLoggedIn) {
        setLoginModalShow(true);
        return; // 로그인 아닐 시
      }
      if (content === '') return alert('내용을 입력해주세요.'); // 내용 없을 시
      dispatch(
        addComment({
          postId,
          content,
        }),
      );
      setContent('');
    },
    [postId, content],
  );

  return (
    <CommentFormBox>
      <LoginModal show={loginModalShow} onCloseLoginModal={onCloseLoginModal} />
      <form onSubmit={onSubmitComment}>
        <div>
          <textarea value={content} onChange={onChangeComment} placeholder="댓글을 입력해주세요." />
        </div>
        <div className="write-btn">
          <button type="submit">댓글 등록</button>
        </div>
      </form>
    </CommentFormBox>
  );
};

export default CommentForm;
