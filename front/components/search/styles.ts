import styled from '@emotion/styled';

// 검색 폼
export const SearchFormWrap = styled.div`
  position: relative;
  max-width: 768px;
  margin: 4rem auto 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 0.625rem;

  @media screen and (max-width: 600px) {
    padding: 0 1rem;
  }

  & div {
    flex: 1;
    & input {
      width: 100%;
      line-height: 40px;
      font-size: 1.25rem;
      border-bottom: 2px solid #20c997;
    }
  }

  & svg {
    font-size: 1.25rem;
    margin-right: 1.25rem;
  }
`;

// 검색 결과 포스트 레이아웃
export const SearchPostCard = styled.div`
  position: relative;
  max-width: 768px;

  & > div {
    margin-bottom: 5rem;
    & .post-title {
      margin-bottom: 1.25rem;
      @media screen and (max-width: 600px) {
        padding: 0 1rem;
      }
      & h1 {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 0.25rem;
      }
      & span {
        padding: 0 1rem;
        font-size: 0.875rem;
        color: #adb5bd;
      }
    }
    & .user-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-bottom: 1.25rem;
      @media screen and (max-width: 600px) {
        padding: 0 1rem 1.25rem 1rem;
      }
      & div {
        width: 30px;
        height: 30px;
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
        font-size: 1rem;
        padding: 1.25rem 1rem;
        border-bottom: 1px solid #dee2e6;
        margin-bottom: 1.25rem;
        line-height: 1.5;
      }
    }
    & .post-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 0.875rem;
      @media screen and (max-width: 600px) {
        padding: 0 1rem;
      }
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
