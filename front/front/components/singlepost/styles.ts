import styled from '@emotion/styled';

export const SinglePostWrapper = styled.div`
  padding: 100px 0;

  & .inner {
    position: relative;
    margin: 0 auto;
    width: 768px;
  }

  & .post-header {
    & .post-user-option {
      text-align: right;
      margin-bottom: 40px;
      & .opt-btn {
        cursor: pointer;
        font-size: 24px;
        color: #adb5bd;
        background: transparent;
      }
      & .edit {
        margin-right: 20px;
      }
      & .edit:hover svg {
        color: #0ca678;
      }
      & .delete:hover svg {
        color: #f03e3e;
      }
    }
    & .title {
      & h1 {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      & input {
        width: 100%;
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      & .user-info {
        display: flex;
        flex-direction: row;
        align-items: center;
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
        & .date {
          font-size: 14px;
          margin-left: 10px;
          color: #adb5bd;
        }
      }
    }
    & .like {
      margin-top: 20px;
      margin-bottom: 40px;
      & svg {
        cursor: pointer;
        vertical-align: text-top;
        margin-right: 5px;
      }
    }
  }

  & .content {
    padding-bottom: 40px;
  }

  & .slider-wrapper {
    position: relative;
    margin-bottom: 100px;

    & .slick-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      z-index: 999;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 36px;
      cursor: pointer;
      color: white;
      background: rgba(0, 0, 0, 0.2);
      &:hover {
        background: rgba(0, 0, 0, 0.5);
      }
    }
    & .slick-prev {
      left: 10px;
    }
    & .slick-next {
      right: 10px;
    }

    & .slick-list {
      overflow: hidden;
    }
    & .slick-dots {
      display: flex !important;
      flex-direction: row;
      justify-content: center;
      & li {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #adb5bd;
        margin: 0 3px;
        & button {
          font-size: 0;
        }
      }
      & .slick-active {
        background: #0ca678;
      }
    }
    & .thumb-img {
      position: relative;
      height: 0;
      padding-bottom: 100%;
      overflow: hidden;
      margin-bottom: 10px;
      & img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    & .slick-track {
      display: flex;
    }
  }

  & .edit-content {
    width: 100%;
    min-height: 200px;
    resize: none;
    border: 1px solid #adb5bd;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 100px;
    &:focus {
      outline: none;
    }
  }

  & .edit-thumb {
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;
    & .thumb-img {
      position: relative;
      width: 100px;
      height: 100px;
      margin-right: 10px;
      &:hover .remove-btn {
        display: block;
      }
      & .remove-btn {
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        font-size: 32px;
        color: white;
        cursor: pointer;
        & svg {
          transform: rotate(45deg);
        }
      }
      & img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  & .add-img-preview {
    display: flex;
    flex-direction: row;
    & div {
      width: 100px;
      height: 100px;
      margin-right: 10px;
    }
    & img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & .add-Image {
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0.4);
    font-size: 32px;
    color: white;
    line-height: 110px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.5);
    }
  }

  & .comment-wrapper {
    & > h1 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
`;
