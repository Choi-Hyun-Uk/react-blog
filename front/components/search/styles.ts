import styled from '@emotion/styled';

// 검색 폼
export const SearchFormWrap = styled.div`
  position: relative;
  max-width: 768px;
  margin: 70px auto 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 2px solid #20c997;
  padding-bottom: 10px;

  & div {
    flex: 1;
    & input {
      width: 100%;
      line-height: 40px;
      font-size: 18px;
    }
  }

  & svg {
    font-size: 20px;
    margin-right: 20px;
  }
`;

// 검색 결과 포스트 레이아웃
export const SearchPostCard = styled.div`
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
