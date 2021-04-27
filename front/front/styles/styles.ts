import styled from '@emotion/styled';

export const MyBlogWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 100px;

  & .inner {
    position: relative;
    margin: 0 auto;
    max-width: 768px;
    padding-bottom: 100px;
  }
`;

// 나의 포스트 레이아웃
export const MyPostBox = styled.div`
  position: relative;
  width: 768px;

  & > div {
    margin-bottom: 100px;
    & .post-title {
      margin-bottom: 20px;
      & h1 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      & span {
        font-size: 14px;
        color: #adb5bd;
      }
    }
    & .user-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-bottom: 20px;
      & div {
        width: 30px;
        height: 30px;
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
    }
    & .post-desc {
      & .image {
        position: relative;
        padding-bottom: 52.356%;
        overflow: hidden;
        & img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      }
      & p {
        padding: 20px 10px;
        border-bottom: 1px solid #dee2e6;
        margin-bottom: 20px;
      }
    }
    & .post-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      & div {
        margin-right: 20px;
        color: #adb5bd;
      }
      & span {
        color: #adb5bd;
      }
    }
  }
`;

// 검색 결과 포스트 카드 최상위 부모
export const SearchPostCardWrapper = styled.div`
  position: relative;
  width: 768px;
  margin: 100px auto 0 auto;
  padding-bottom: 100px;
`;
