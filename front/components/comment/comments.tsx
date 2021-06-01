import React, { useState, useCallback, useEffect } from 'react';
import { CommentList } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'slices';
import { editComment, deleteComment } from 'actions/post';
import dayjs from 'dayjs';

import LoginModal from 'modal/loginModal';
import DeleteCommentModal from 'modal/deleteCommentModal';

const Comments = ({ item }) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn); // 로그인 상태
  const me = useSelector((state: RootState) => state.user.user?.id); // 현재 로그인 유저
  const { editCommentLoading } = useSelector((state: RootState) => state.post);
  const [mode, setMode] = useState(true);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [deleteCommentModalshow, setDeleteCommentModalShow] = useState(false);
  const [contentValue, setContentValue] = useState(item.content);
  const data = dayjs(item.createdAt);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!editCommentLoading) {
      setMode(true);
    }
  }, [editCommentLoading]);

  // 댓글 삭제 취소 버튼
  const onDeleteCancle = useCallback(() => {
    setDeleteCommentModalShow(false);
  }, [deleteCommentModalshow]);

  // 댓글 삭제 클릭 시 모달
  const onDeleteCommentModalShow = useCallback(() => {
    setDeleteCommentModalShow(true);
  }, [deleteCommentModalshow]);

  // 댓글 삭제 모달
  const onDeleteComment = useCallback(() => {
    dispatch(
      deleteComment({
        postId: item.PostId,
        id: item.id,
      }),
    );
  }, [item.PostId, item.id]);

  // 댓글 수정 모드 변경
  const onCommentEditMode = useCallback(() => {
    setMode((prev) => !prev);
  }, [mode]);

  const onChangeContent = useCallback(
    (e) => {
      setContentValue(e.target.value);
    },
    [contentValue],
  );

  // 댓글 수정 완료
  const onCommentEdit = useCallback(() => {
    if (!isLoggedIn) {
      return setLoginModalShow(true);
    }
    dispatch(
      editComment({
        postId: item.PostId,
        commentId: item.id,
        content: contentValue,
      }),
    );
  }, [item.PostId, item.id, contentValue]);

  return (
    <CommentList>
      {mode ? (
        <div className="comment-list-wrapper">
          <div className="user-info">
            {item.User.Images.length > 0 && (
              <div>
                <img src={item.User.Images[0].src} />
              </div>
            )}
            <h1>{item.User.nickname}</h1>
          </div>
          <span className="date">{data.format('YYYY년 MM월 DD일')}</span>
          <div className="comment-content">{item.content}</div>
        </div>
      ) : (
        <div className="comment-list-wrapper">
          <div className="user-info">
            {item.User.Images.length > 0 && (
              <div>
                <img src={item.User.Images[0].src} />
              </div>
            )}
            <h1>{item.User.nickname}</h1>
          </div>
          <span className="date">{data.format('YYYY년 MM월 DD일')}</span>
          <textarea value={contentValue} onChange={onChangeContent} />
        </div>
      )}
      {me === item.User.id ? (
        <>
          {mode ? (
            <div className="comment-option">
              <button onClick={onCommentEditMode}>수정</button>
              <button onClick={onDeleteCommentModalShow}>삭제</button>
            </div>
          ) : (
            <>
              <div className="comment-option">
                <button onClick={onCommentEdit}>완료</button>
                <button onClick={onCommentEditMode}>취소</button>
              </div>
            </>
          )}
        </>
      ) : null}
      <DeleteCommentModal
        show={deleteCommentModalshow}
        onDeleteComment={onDeleteComment}
        onDeleteCancle={onDeleteCancle}
      />
    </CommentList>
  );
};

export default Comments;
