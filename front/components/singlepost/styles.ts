import styled from '@emotion/styled';

export const SinglePostWrapper = styled.div`
  padding: 100px 0;

  @media screen and (max-width: 600px) {
    padding: 4rem 0;
  }

  & .inner {
    position: relative;
    margin: 0 auto;
    width: 768px;
    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }

  & .post-header {
    @media screen and (max-width: 600px) {
      padding: 0 1rem;
    }
    & .post-user-option {
      text-align: right;
      margin-bottom: 2rem;
      & .opt-btn {
        cursor: pointer;
        font-size: 1.5rem;
        color: #adb5bd;
        background: transparent;
      }
      & .edit {
        margin-right: 1.25rem;
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
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1.25rem;
        @media screen and (max-width: 600px) {
          font-size: 1.875rem;
        }
      }
      & input {
        width: 100%;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1.25rem;
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
          margin-right: 0.625rem;
          & img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        & .date {
          font-size: 0.825rem;
          margin-left: 0.625rem;
          color: #adb5bd;
        }
      }
    }
    & .like {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 1.25rem;
      margin-bottom: 3rem;
      & svg {
        cursor: pointer;
        vertical-align: text-top;
        margin-right: 5px;
      }
    }
  }

  & .content {
    padding: 0 1rem;
    font-size: 1rem;
    padding-bottom: 3rem;
  }

  & .slider-wrapper {
    position: relative;
    margin-bottom: 100px;
    overflow: hidden;

    & .slick-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.25rem;
      z-index: 999;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 2.25rem;
      cursor: pointer;
      color: white;
      background: rgba(0, 0, 0, 0.2);
      &:hover {
        background: rgba(0, 0, 0, 0.5);
      }
    }
    & .slick-prev {
      left: 0.625rem;
    }
    & .slick-next {
      right: 0.625rem;
    }

    & .slick-list {
      overflow: hidden;
    }
    & .slick-dots {
      display: flex !important;
      flex-direction: row;
      justify-content: center;
      & li {
        width: 0.5rem;
        height: 0.5rem;
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
      margin-bottom: 0.625rem;
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
    margin-bottom: 5rem;
    @media only screen and (max-width: 600px) {
      padding: 1rem;
    }
    & textarea {
      width: 100%;
      min-height: 200px;
      resize: none;
      font-size: 0.825rem;
      border: 1px solid #adb5bd;
      padding: 1.25rem;
      box-sizing: border-box;
      &:focus {
        outline: none;
      }
    }
  }

  & .edit-thumb {
    display: flex;
    flex-direction: row;
    padding: 0 1rem;
    margin-bottom: 3rem;
    & .thumb-img {
      position: relative;
      width: 100px;
      height: 100px;
      margin-right: 0.625rem;
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
        font-size: 2rem;
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
    @media screen and (max-width: 600px) {
      padding: 0 1rem;
    }
    & > h1 {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 1.25rem;
    }
  }
`;
