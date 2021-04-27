import React from 'react';
import { ModalWrapper, DeleteModalBox } from './styles';

const DeletePostModal = ({ deletePostModalShow, onDeletePost, onDeleteCancle }) => {
  if (!deletePostModalShow) {
    return null;
  }

  return (
    <ModalWrapper>
      {deletePostModalShow && (
        <DeleteModalBox>
          <h1>게시글 삭제</h1>
          <p>게시글을 삭제하시겠습니까?</p>
          <div>
            <button className="cancle-btn" onClick={onDeleteCancle}>
              취소
            </button>
            <button className="delete-btn" onClick={onDeletePost}>
              삭제
            </button>
          </div>
        </DeleteModalBox>
      )}
    </ModalWrapper>
  );
};

export default DeletePostModal;
