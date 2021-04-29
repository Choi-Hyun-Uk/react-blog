import React, { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WriteWrapper, ImgWrapper } from './styles';
import { addPost, uploadImages } from '../actions/post';
import { RootState } from 'slices';
import Images from './images';
import Link from 'next/link';

const WriteForm = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const { imagePaths } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef<HTMLInputElement>(null);

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

  const onSubmitWrite = useCallback(
    (e) => {
      e.preventDefault();
      if (!title) {
        return alert('제목을 입력해주세요.');
      }
      if (!content) {
        return alert('내용을 입력해주세요');
      }
      const formData = new FormData();
      imagePaths.forEach((src) => {
        formData.append('image', src); // append - req.body.image
      });
      formData.append('title', title); // append - req.body.title
      formData.append('content', content); // append - req.body.content
      dispatch(addPost(formData));
      setTitle('');
      setContent('');
    },
    [title, content, imagePaths],
  );

  // 첨부한 이미지 백서버로 보낸 후 받아오기 (미리보기)
  const onChangeImage = useCallback((e) => {
    console.log(e.target.files); // 선택한 파일에 대한 정보
    const imageFormData = new FormData(); // multipart form data로 보낼 수 있음
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f); // image - key, f - value
    });
    dispatch(uploadImages(imageFormData));
  }, []);

  const onImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <WriteWrapper>
      {user ? (
        <form onSubmit={onSubmitWrite} encType="multipart/form-data">
          <div className="titlebox">
            <input type="text" value={title} onChange={onChangeTitle} placeholder="제목을 입력해주세요." />
          </div>
          <div className="textbox">
            <textarea value={content} onChange={onChangeContent} placeholder="오늘은 무슨일이 있었나요?" />
          </div>
          <div>
            <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImage} />
          </div>
          <div className="form-bottom">
            <ImgWrapper>
              {imagePaths.length > 0 && (
                <ul>
                  {imagePaths.map((item, v) => (
                    <Images key={v} filename={item.replace(/\/thumb\//, '/original/')} />
                  ))}
                </ul>
              )}
            </ImgWrapper>
            <div>
              <button className="file-btn" type="button" onClick={onImageUpload}>
                첨부
              </button>
              <button type="submit" className="write-btn">
                게시
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="login-box">
          <p>로그인 후 게시글을 작성할 수 있습니다.</p>
          <div>
            <Link href="/login">
              <a className="login-btn">로그인</a>
            </Link>
            <Link href="/signup">
              <a className="signup-btn">회원가입</a>
            </Link>
          </div>
        </div>
      )}
    </WriteWrapper>
  );
};

export default WriteForm;
