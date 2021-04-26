import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addComment } from '../../actions/post';
import { CommentFormBox } from './styles';

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const onChangeComment = useCallback(
    (e) => {
      setContent(e.target.value);
    },
    [content],
  );

  const onSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      if (content === '') {
        return alert('내용을 입력해주세요.');
      }
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
