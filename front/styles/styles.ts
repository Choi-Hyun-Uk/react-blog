import styled from '@emotion/styled';

// 메인 페이지 Inner
export const PostCardInner = styled.div`
  position: relative;
  width: 1000px;
  margin: 4rem auto 0 auto;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

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
  max-width: 768px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }

  & > div {
    margin-bottom: 100px;
    @media only screen and (max-width: 600px) {
      margin-bottom: 5rem;
    }
    & .post-title {
      margin-bottom: 1.25rem;
      @media only screen and (max-width: 600px) {
        padding: 0 1rem;
      }
      & h1 {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 0.625rem;
      }
      & span {
        padding: 0 1rem;
        font-size: 0.875rem;
        color: #adb5bd;
      }
    }
    & .user-info {
      @media only screen and (max-width: 600px) {
        padding: 1rem;
      }
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-bottom: 1.25rem;
      & div {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 1.25rem;
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
        padding: 1.25rem 1rem;
        border-bottom: 1px solid #dee2e6;
        margin-bottom: 1.25rem;
      }
    }
    & .post-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 1rem;
      font-size: 0.875rem;
      & div {
        margin-right: 1.25rem;
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
  max-width: 768px;
  margin: 5rem auto 0 auto;
  padding-bottom: 5rem;
`;
