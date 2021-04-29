import React, { useState, useCallback, useEffect } from 'react';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { RiEdit2Line, RiDeleteBin4Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { editPost, removePost } from '../../actions/post';
import { RootState } from 'slices';
import Router from 'next/router';
import dayjs from 'dayjs';
import Slider from 'react-slick';

import DeletePostModal from '../../modal/deletePostModal';
import EditPostForm from './editPostForm';
import Link from 'next/link';
import PrevArrow from './prevArrow';
import NextArrow from './nextArrow';

const SinglePostContent = ({ onClickLike, onClickUnLike }) => {
  const post = useSelector((state: RootState) => state.post.singlePost);
  const user = useSelector((state: RootState) => state.user.user?.id);
  const { imagePaths } = useSelector((state: RootState) => state.post);
  const [deletePostModalShow, setDeletePostModalShow] = useState(false);
  const [edit, setEdit] = useState(true);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const { updateLoading, updatePostDone } = useSelector((state: RootState) => state.post);
  const date = dayjs(post.createdAt);
  const postUser = post.User.id; // 포스트 작성자 id
  const dispatch = useDispatch();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    className: 'slider-wrapper',
  };

  // 수정 완료 시 UX를 위함 함수
  useEffect(() => {
    if (!updateLoading && updatePostDone) {
      setEdit(true);
    }
  }, [updateLoading, updatePostDone]);

  const onEditCancle = useCallback(() => {
    setEdit(true);
    setContent(post.content);
  }, [edit]);

  // 게시글 삭제 버튼 클릭 시 확인 모달
  const onDeleteModalShow = useCallback(() => {
    setDeletePostModalShow(true);
  }, [deletePostModalShow]);

  const onDeleteCancle = useCallback(() => {
    setDeletePostModalShow(false);
  }, [deletePostModalShow]);

  const onChangeTitle = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [title],
  );

  const onChangeContent = useCallback(
    (e) => {
      setContent(e.target.value);
    },
    [content],
  );

  const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;
  const regex2 = title.replace(regex, '-');
  const postTitle = regex2.replace(/-$/, '');

  const onSubmitImageUpload = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      imagePaths.forEach((src) => {
        formData.append('image', src); // append - req.body.image
      });
      formData.append('postId', post.id); // append - req.body.id
      formData.append('title', title); // append - req.body.title
      formData.append('content', content); // append - req.body.content
      dispatch(editPost(formData));
      Router.replace(`/${post.User.nickname}/${postTitle}`);
    },
    [title, content, imagePaths],
  );

  // 게시글 삭제
  const onDeletePost = useCallback(() => {
    dispatch(
      removePost({
        postId: post.id,
      }),
    );
    Router.replace('/');
  }, [post.id]);

  // 수정 아이콘 클릭 시
  const onEditMode = useCallback(() => {
    setEdit(false);
  }, [edit]);

  const like = post.Likers.find((v) => v.id === user);

  return (
    <>
      {edit ? (
        <>
          <div className="post-header">
            {user === postUser ? (
              <div className="post-user-option">
                <button className="opt-btn edit" onClick={onEditMode}>
                  <RiEdit2Line />
                </button>
                <button className="opt-btn delete" onClick={onDeleteModalShow}>
                  <RiDeleteBin4Line />
                </button>
                <DeletePostModal
                  deletePostModalShow={deletePostModalShow}
                  onDeletePost={onDeletePost}
                  onDeleteCancle={onDeleteCancle}
                />
              </div>
            ) : null}
            <div className="title">
              <h1>{post.title}</h1>
              <div className="user-info">
                {post.User.Images.length > 0 && (
                  <div>
                    <img src={post.User.Images[0].src} />
                  </div>
                )}
                <Link
                  href={{
                    pathname: '/[pagename]/',
                  }}
                  as={`/${post.User.nickname}`}
                >
                  <a>{post.User.nickname}</a>
                </Link>
                <span className="date">{date.format('YYYY년 MM월 DD일')}</span>
              </div>
              <div className="like">
                {like ? <HiHeart onClick={onClickUnLike} /> : <HiOutlineHeart onClick={onClickLike} />}
                <span>{post.Likers.length}</span>
              </div>
            </div>
          </div>
          <pre className="content">{post.content}</pre>
          {post.Images.length > 0 ? (
            <Slider {...settings}>
              {post.Images.map((v) => (
                <div key={v.id} className="thumb-img">
                  <img key={v.id} src={v.src.replace(/\/thumb\//, '/original/')} />
                </div>
              ))}
            </Slider>
          ) : null}
        </>
      ) : (
        <EditPostForm
          onEditCancle={onEditCancle}
          onSubmitImageUpload={onSubmitImageUpload}
          onChangeContent={onChangeContent}
          title={title}
          content={content}
          like={like}
          onChangeTitle={onChangeTitle}
          onClickLike={onClickLike}
          onClickUnLike={onClickUnLike}
        />
      )}
    </>
  );
};

export default SinglePostContent;
