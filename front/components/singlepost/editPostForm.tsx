import React, { useCallback, useRef } from 'react';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { RiCheckFill, RiCloseFill, RiAddFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImages, removeImage } from '../../actions/post';
import { RootState } from 'slices';
import dayjs from 'dayjs';

const EditPostForm = ({
  onEditCancle,
  onSubmitImageUpload,
  title,
  content,
  onChangeContent,
  like,
  onClickLike,
  onClickUnLike,
  onChangeTitle,
}) => {
  const post = useSelector((state: RootState) => state.post.singlePost);
  const { imagePaths } = useSelector((state: RootState) => state.post);
  const imageInput = useRef<HTMLInputElement>(null);
  const date = dayjs(post.createdAt);
  const dispatch = useDispatch();

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
    console.log('이미지 업로드');
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImage = useCallback(
    (id) => () => {
      dispatch(removeImage({ id }));
    },
    [],
  );

  return (
    <form onSubmit={onSubmitImageUpload} encType="multipart/form-data">
      <div className="post-header">
        <div className="post-user-option">
          <button type="submit" className="opt-btn edit">
            <RiCheckFill />
          </button>
          <button className="opt-btn delete" onClick={onEditCancle}>
            <RiCloseFill />
          </button>
        </div>
        <div className="title">
          <input value={title} onChange={onChangeTitle} />
          <div className="user-info">
            {post.User.Images.length > 0 && (
              <div>
                <img src={`http://localhost:3050/${post.User.Images[0].src}`} />
              </div>
            )}
            <p>{post.User.nickname}</p>
            <span className="date">{date.format('YYYY년 MM월 DD일')}</span>
          </div>
          <div className="like">
            {like ? <HiHeart onClick={onClickUnLike} /> : <HiOutlineHeart onClick={onClickLike} />}
            <span>{post.Likers.length}</span>
          </div>
        </div>
      </div>
      <div className="edit-thumb">
        {post.Images.length > 0 ? (
          <>
            {post.Images.map((v) => (
              <div key={v.id} className="thumb-img">
                <button type="button" className="remove-btn" onClick={onRemoveImage(v.id)}>
                  <RiAddFill />
                </button>
                <img src={`http://localhost:3050/${v.src}`} />
              </div>
            ))}
          </>
        ) : null}
        {imagePaths.length > 0 && (
          <div className="add-img-preview">
            {imagePaths.map((item, i) => (
              <div key={i}>
                <img src={`http://localhost:3050/${item}`} alt={item} />
              </div>
            ))}
          </div>
        )}
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImage} />
        <button type="button" className="add-Image" onClick={onImageUpload}>
          <RiAddFill />
        </button>
      </div>
      <textarea className="edit-content" value={content} onChange={onChangeContent} />
    </form>
  );
};

export default EditPostForm;
