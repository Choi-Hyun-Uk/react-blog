import styled from '@emotion/styled';

// 포스트 전체 영역
export const PostWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 1032px;
  margin-left: -1rem;
  margin-top: 3rem;

  @media only screen and (max-width: 600px) {
    margin-left: 0;
    width: 100%;
  }
`;

// 포스트 레이아웃
export const PostLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.333333%;
  padding: 1rem;
  box-sizing: border-box;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }

  & .postLayout-inner {
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

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
    padding: 1.25rem 0.75rem;
    & .title {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 0.875rem;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: keep-all;
    }
    & > p {
      font-size: 0.875rem;
      line-height: 1.5;
      word-break: break-word;
      overflow-wrap: break-word;
      height: 3.875rem;
      margin-bottom: 0.875rem;
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
      padding: 0.875rem 0;
      border-top: 1px solid #dee2e6;
      line-height: 1.5;
      & .user-info {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        color: #495057;
        & span {
          display: inline-block;
          width: 30px;
          height: 30px;
          overflow: hidden;
          margin-right: 0.625rem;
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
        flex-direction: row;
        align-items: center;
        & p {
          padding-top: 0.25rem;
        }
        & svg {
          cursor: pointer;
          margin-right: 0.25rem;
        }
      }
    }
  }

  & .post-option {
    font-size: 0.75rem;
    & span {
      &:first-of-type {
        margin-right: 0.625rem;
      }
      color: #adb5bd;
    }
  }
`;
