import React from 'react';
import { ModalWrapper, DeleteModalBox } from './styles';

const DeleteCommentModal = ({ show, onDeleteComment, onDeleteCancle }) => {
  if (!show) {
    return null;
  }

  return (
    <ModalWrapper>
      {show && (
        <DeleteModalBox>
          <h1>댓글 삭제</h1>
          <p>댓글을 삭제하시겠습니까?</p>
          <div>
            <button className="cancle-btn" onClick={onDeleteCancle}>
              취소
            </button>
            <button className="delete-btn" onClick={onDeleteComment}>
              삭제
            </button>
          </div>
        </DeleteModalBox>
      )}
    </ModalWrapper>
  );
};

export default DeleteCommentModal;
