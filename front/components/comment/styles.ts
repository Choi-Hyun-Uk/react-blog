import styled from '@emotion/styled';

// 댓글 입력 폼
export const CommentFormBox = styled.div`
  margin-bottom: 4rem;

  & .write-btn {
    text-align: right;
    margin-top: 0.825rem;
    & button {
      background: #20c997;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 2px;
      cursor: pointer;
    }
  }

  & textarea {
    width: 100%;
    height: 100px;
    font-size: 0.825rem;
    resize: none;
    border: 1px solid #dee2e6;
    padding: 1.25rem;
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
  margin-bottom: 1.25rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #dee2e6;

  & .comment-list-wrapper {
    flex: 1;
    padding-right: 3rem;
    & .user-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      & div {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.625rem;
        & img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      & h1 {
        font-size: 1.25rem;
        font-weight: bold;
        color: #20c997;
      }
    }
    & .date {
      display: block;
      font-weight: normal;
      font-size: 0.825rem;
      color: #adb5bd;
      margin: 1.25rem 0;
    }
  }

  & textarea {
    width: 100%;
    height: 100px;
    resize: none;
    border: 1px solid #dee2e6;
    padding: 1.25rem;
    outline: none;
    box-sizing: border-box;
    vertical-align: bottom;

    &:focus {
      border: 2px solid #20c997;
    }
  }

  & .comment-option {
    & button:first-of-type {
      margin-right: 0.625rem;
    }
    & button {
      font-size: 0.825rem;
      cursor: pointer;
      background: transparent;
      color: #adb5bd;
      &:hover {
        color: #20c997;
      }
    }
  }
`;
