import styled from '@emotion/styled';

// 댓글 입력 폼
export const CommentFormBox = styled.div`
  margin-bottom: 60px;

  & .write-btn {
    text-align: right;
    margin-top: 14px;
    & button {
      background: #20c997;
      color: white;
      padding: 8px 16px;
      border-radius: 2px;
      cursor: pointer;
    }
  }

  & textarea {
    width: 100%;
    height: 100px;
    resize: none;
    border: 1px solid #dee2e6;
    padding: 20px;
    outline: none;
    box-sizing: border-box;
    vertical-align: bottom;

    &:focus {
      border: 2px solid #20c997;
    }
  }
`;

// 댓글 리스트
export const CommentList = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 40px;
  border-bottom: 1px solid #dee2e6;

  & .comment-list-wrapper {
    flex: 1;
    padding-right: 40px;
    & .user-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      & div {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        & img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      & h1 {
        font-size: 20px;
        font-weight: bold;
        color: #20c997;
      }
    }
    & .date {
      display: block;
      font-weight: normal;
      font-size: 14px;
      color: #adb5bd;
      margin: 20px 0;
    }
  }

  & textarea {
    width: 100%;
    height: 100px;
    resize: none;
    border: 1px solid #dee2e6;
    padding: 20px;
    outline: none;
    box-sizing: border-box;
    vertical-align: bottom;

    &:focus {
      border: 2px solid #20c997;
    }
  }

  & .comment-option {
    & button:first-of-type {
      margin-right: 10px;
    }
    & button {
      cursor: pointer;
      background: transparent;
      color: #adb5bd;
      &:hover {
        color: #20c997;
      }
    }
  }
`;
