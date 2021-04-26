import styled from '@emotion/styled';

// 포스트 전체 영역
export const PostWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  max-width: 1040px;
  margin: 50px auto 0 auto;
  padding-bottom: 100px;
`;

// 포스트 레이아웃
export const PostLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 306px;
  margin: 20px;

  border-radius: 4px;
  overflow: hidden;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  & .thumb {
    position: relative;
    width: 100%;
    height: 200px;
    & img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    & div {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      color: white;
      background: rgba(0, 0, 0, 0.6);
    }
  }

  & .post-info {
    padding: 20px 12px;
    & .title {
      font-weight: bold;
      margin-bottom: 16px;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: keep-all;
    }
    & > p {
      font-size: 13px;
      line-height: 1.5;
      word-break: break-word;
      overflow-wrap: break-word;
      line-height: 1.5;
      height: 57px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgb(73, 80, 87);
    }

    & .option {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #dee2e6;
      line-height: 20px;
      & .user-info {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #495057;
        & span {
          display: inline-block;
          width: 30px;
          height: 30px;
          overflow: hidden;
          margin-right: 10px;
          border-radius: 50%;
          & img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      & .like {
        display: flex;
        & svg {
          cursor: pointer;
          margin-right: 10px;
        }
      }
    }
  }

  & .post-option {
    margin-top: 10px;
    font-size: 12px;
    & span {
      &:first-of-type {
        margin-right: 10px;
      }
      color: #adb5bd;
    }
  }
`;
